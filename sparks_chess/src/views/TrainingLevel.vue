<template>
  <div class="lvl-page">

    <!-- header bar -->
    <header class="lvl-header">
      <router-link :to="`/${category}`" class="back-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        Levels
      </router-link>
      <div class="lvl-info">
        <span class="lvl-category">{{ title }}</span>
        <span class="lvl-sep">·</span>
        <span class="lvl-name">Level {{ levelNum }} — {{ levelTitle }}</span>
      </div>
    </header>

    <!-- content -->
    <main class="lvl-body">
      <div v-if="loadError" class="error">{{ loadError }}</div>
      <div v-else-if="!puzzles.length && levelTitle" class="coming-soon-box">
        <div class="cs-icon">🔜</div>
        <div class="cs-title">Coming Soon</div>
        <p class="cs-sub">Puzzles for <strong>{{ levelTitle }}</strong> are on the way.<br>Check back soon!</p>
      </div>
      <template v-else-if="puzzles.length">
        <TrainingBoard :key="boardReset" :puzzles="puzzles" :accent="accent" @complete="onComplete" />
        <transition name="fade">
          <div v-if="isComplete" class="complete-banner">
            <div class="complete-title">🏆 Level {{ levelNum }} Complete!</div>
            <p class="complete-sub">You solved all {{ puzzles.length }} puzzles.</p>
            <div class="complete-actions">
              <button class="action-btn reset" @click="resetLevel">↺ Reset Level</button>
              <router-link
                v-if="levelNum < totalLevels"
                :to="`/${category}/${levelNum + 1}`"
                class="action-btn next"
              >
                Next Level →
              </router-link>
              <router-link v-else :to="`/${category}`" class="action-btn next">
                Back to Levels
              </router-link>
            </div>
          </div>
        </transition>
      </template>
      <div v-else class="loading">Loading puzzles…</div>
    </main>

  </div>
</template>

<script>
import TrainingBoard from '../components/TrainingBoard.vue'

export default {
  name: 'TrainingLevel',
  components: { TrainingBoard },
  data() {
    return {
      puzzles:     [],
      levelTitle:  '',
      totalLevels: 5,
      loadError:   '',
      isComplete:  false,
      boardReset:  0,
    }
  },
  computed: {
    category() { return this.$route.meta.category },
    accent()   { return this.$route.meta.accent   },
    title()    { return this.$route.meta.title    },
    levelNum() { return parseInt(this.$route.params.level) },
  },
  async created() {
    await this.loadLevel()
  },
  watch: {
    '$route.params.level'() { this.loadLevel() },
  },
  methods: {
    async loadLevel() {
      this.puzzles    = []
      this.levelTitle = ''
      this.loadError  = ''
      this.isComplete = false
      this.boardReset++
      try {
        const r = await fetch(`/puzzles/${this.category}/level_${this.levelNum}.json`)
        if (!r.ok) throw new Error(r.status)
        const lv        = await r.json()
        this.puzzles    = lv.puzzles
        this.levelTitle = lv.title
        // check if a next level file exists
        const next = await fetch(`/puzzles/${this.category}/level_${this.levelNum + 1}.json`)
        this.totalLevels = next.ok ? this.levelNum + 1 : this.levelNum
      } catch {
        this.loadError = `Could not load public/puzzles/${this.category}/level_${this.levelNum}.json`
      }
      const done = JSON.parse(localStorage.getItem(`sparks_done_${this.category}`) || '[]')
      this.isComplete = done.includes(this.levelNum)
    },
    onComplete() {
      this.isComplete = true
      const key  = `sparks_done_${this.category}`
      const done = JSON.parse(localStorage.getItem(key) || '[]')
      if (!done.includes(this.levelNum)) {
        done.push(this.levelNum)
        localStorage.setItem(key, JSON.stringify(done))
      }
    },
    resetLevel() {
      const key  = `sparks_done_${this.category}`
      const done = JSON.parse(localStorage.getItem(key) || '[]')
      localStorage.setItem(key, JSON.stringify(done.filter(n => n !== this.levelNum)))
      this.isComplete = false
      this.boardReset++
    },
  },
}
</script>

<style scoped>
.lvl-page {
  min-height: 100vh;
  padding-top: 64px;
  background: #0d0d0d;
  color: #e0d0b0;
  font-family: 'Segoe UI', system-ui, sans-serif;
  display: flex;
  flex-direction: column;
}

/* header */
.lvl-header {
  position: sticky;
  top: 64px;
  z-index: 20;
  height: 52px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 32px;
  background: rgba(13,13,13,0.92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255,255,255,0.07);
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: rgba(255,255,255,0.4);
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;
  white-space: nowrap;
  flex-shrink: 0;
  transition: color 0.2s;
}
.back-btn svg  { width: 15px; height: 15px; }
.back-btn:hover { color: v-bind(accent); }

.lvl-info     { display: flex; align-items: center; gap: 8px; font-size: 14px; overflow: hidden; }
.lvl-category { font-weight: 800; color: v-bind(accent); white-space: nowrap; }
.lvl-sep      { color: rgba(255,255,255,0.2); }
.lvl-name     { color: rgba(255,255,255,0.55); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* body */
.lvl-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  padding: 36px 24px 60px;
}

.loading { color: rgba(255,255,255,0.4); padding: 40px; text-align: center; font-size: 15px; }
.error   { color: #f87171; padding: 20px; text-align: center; font-size: 14px; }

/* coming soon */
.coming-soon-box {
  width: 100%;
  max-width: 420px;
  background: rgba(255,255,255,0.03);
  border: 1.5px solid rgba(255,255,255,0.08);
  border-radius: 18px;
  padding: 48px 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
}
.cs-icon  { font-size: 44px; line-height: 1; }
.cs-title { font-size: 24px; font-weight: 900; color: #e0d0b0; }
.cs-sub   { font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.7; margin: 0; }
.cs-sub strong { color: v-bind(accent); font-weight: 700; }

/* complete banner */
.complete-banner {
  width: 100%;
  max-width: 480px;
  background: rgba(34,197,94,0.08);
  border: 1.5px solid rgba(34,197,94,0.32);
  border-radius: 16px;
  padding: 28px 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.complete-title {
  font-size: 22px;
  font-weight: 900;
  color: #4ade80;
}

.complete-sub {
  font-size: 14px;
  color: rgba(255,255,255,0.45);
  margin: 0;
}

.complete-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 12px;
}

.action-btn {
  padding: 10px 24px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.18s;
  display: inline-flex;
  align-items: center;
}

.action-btn.reset {
  border: 1px solid rgba(255,255,255,0.15);
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.6);
}
.action-btn.reset:hover {
  background: rgba(255,255,255,0.1);
  color: #fff;
}

.action-btn.next {
  border: 1px solid color-mix(in srgb, v-bind(accent) 50%, transparent);
  background: color-mix(in srgb, v-bind(accent) 14%, transparent);
  color: v-bind(accent);
}
.action-btn.next:hover {
  background: color-mix(in srgb, v-bind(accent) 24%, transparent);
}

/* transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from,  .fade-leave-to      { opacity: 0; }

@media (max-width: 640px) {
  .lvl-page   { padding-top: 64px; }
  .lvl-header { top: 64px; padding: 0 16px; }
  .lvl-body   { padding: 20px 12px 40px; }
}
</style>
