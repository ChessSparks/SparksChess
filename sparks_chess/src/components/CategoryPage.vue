<template>
  <div class="cat-page" :style="{ '--accent': accent }">

    <!-- header: back + title + tabs -->
    <header class="cat-header">
      <div class="header-row">
        <router-link to="/" class="back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          <span>Back</span>
        </router-link>

        <div class="header-title">
          <h1 class="title-text">{{ title }}</h1>
        </div>

        <nav class="tab-bar" ref="tabBar">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="tab-btn"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
          <span class="tab-indicator" :style="indicatorStyle"></span>
        </nav>
      </div>
    </header>

    <!-- tab panels -->
    <main class="cat-main">
      <transition name="tab-fade" mode="out-in">
        <div class="tab-panel" :key="activeTab">
          <slot :name="activeTab" />
        </div>
      </transition>
    </main>

  </div>
</template>

<script>
export default {
  name: 'CategoryPage',
  props: {
    title:  { type: String, required: true },
    accent: { type: String, default: '#e8d5a3' },
  },
  data() {
    return {
      activeTab: 'train',
      indicatorStyle: { width: '0px', transform: 'translateX(0px)' },
      tabs: [
        { id: 'train',  label: 'Training' },
        { id: 'videos', label: 'Videos'   },
        { id: 'read',   label: 'Read'     },
      ],
    }
  },
  watch: {
    activeTab() { this.updateIndicator() },
  },
  mounted() {
    this.updateIndicator()
    window.addEventListener('resize', this.updateIndicator)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateIndicator)
  },
  methods: {
    updateIndicator() {
      this.$nextTick(() => {
        const bar = this.$refs.tabBar
        if (!bar) return
        const activeEl = bar.querySelector('.tab-btn.active')
        if (!activeEl) return
        const barRect = bar.getBoundingClientRect()
        const elRect = activeEl.getBoundingClientRect()
        this.indicatorStyle = {
          width: elRect.width + 'px',
          transform: `translateX(${elRect.left - barRect.left}px)`,
        }
      })
    },
  },
}
</script>

<style scoped>
.cat-page {
  min-height: 100vh;
  padding-top: 64px; /* account for fixed NavBar */
  background:
    radial-gradient(ellipse 900px 500px at 15% 0%, color-mix(in srgb, var(--accent) 8%, transparent), transparent 60%),
    #0d0d0d;
  color: #e0d0b0;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

/* ── header ──────────────────────────────────────────── */
.cat-header {
  position: sticky;
  top: 64px; /* stick just below the NavBar */
  z-index: 20;
  background: rgba(13,13,13,0.78);
  backdrop-filter: blur(16px) saturate(140%);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
  border-bottom: 1px solid rgba(255,255,255,0.07);
  box-shadow: 0 1px 0 0 color-mix(in srgb, var(--accent) 22%, transparent);
  flex-shrink: 0;
}

.header-row {
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 0 32px;
  height: 64px;
  max-width: 1280px;
  margin: 0 auto;
}

/* ── back button ─────────────────────────────────────── */
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: rgba(255,255,255,0.42);
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;
  white-space: nowrap;
  flex-shrink: 0;
  padding: 7px 12px 7px 9px;
  border-radius: 20px;
  transition: color 0.2s, background 0.2s;
}
.back-btn svg { width: 15px; height: 15px; transition: transform 0.2s; }
.back-btn:hover { color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, transparent); }
.back-btn:hover svg { transform: translateX(-3px); }

/* ── title ───────────────────────────────────────────── */
.header-title {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.title-text {
  margin: 0;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: linear-gradient(90deg, #fff, var(--accent) 140%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* ── tabs ────────────────────────────────────────────── */
.tab-bar {
  position: relative;
  display: flex;
  gap: 2px;
  flex-shrink: 0;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  padding: 4px;
}

.tab-btn {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 8px 18px;
  background: none;
  border: none;
  border-radius: 9px;
  color: rgba(255,255,255,0.42);
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.25s;
}

.tab-btn:hover  { color: rgba(255,255,255,0.78); }
.tab-btn.active { color: #14100a; }

.tab-indicator {
  position: absolute;
  top: 4px;
  left: 0;
  height: calc(100% - 8px);
  border-radius: 9px;
  background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 70%, white));
  box-shadow: 0 2px 14px -2px color-mix(in srgb, var(--accent) 75%, transparent);
  transition: transform 0.32s cubic-bezier(0.65, 0, 0.35, 1), width 0.32s cubic-bezier(0.65, 0, 0.35, 1);
}

/* ── main ────────────────────────────────────────────── */
.cat-main {
  flex: 1;
  padding: 36px 32px;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
}

.tab-fade-enter-active, .tab-fade-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.tab-fade-enter-from { opacity: 0; transform: translateY(6px); }
.tab-fade-leave-to   { opacity: 0; transform: translateY(-6px); }

@media (max-width: 640px) {
  /* keep NavBar space — don't zero it out */
  .cat-page { padding-top: 64px; }

  .cat-header { top: 64px; }

  .header-row {
    padding: 12px 16px;
    height: auto;
    flex-wrap: wrap;
    gap: 10px;
  }

  .back-btn { order: 1; padding: 5px 10px 5px 7px; }
  .header-title { order: 2; flex: 1; justify-content: flex-end; }
  .title-text { font-size: 15px; }

  .tab-bar {
    order: 3;
    width: 100%;
  }

  .tab-btn {
    flex: 1;
    justify-content: center;
    padding: 8px 4px;
    font-size: 10.5px;
    letter-spacing: 0.04em;
  }

  .cat-main { padding: 20px 16px; }
}
</style>
