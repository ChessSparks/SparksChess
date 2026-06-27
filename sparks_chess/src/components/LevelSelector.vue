<template>
  <div class="level-selector">
    <p v-if="loadError" class="error">{{ loadError }}</p>
    <div v-else-if="!levels.length" class="loading">Loading levels…</div>
    <div v-else class="level-grid">
      <div
        v-for="(lv, i) in levels" :key="i"
        class="level-card"
        :class="{
          'is-locked':       isLocked(i + 1),
          'is-completed':    isCompleted(i + 1),
          'is-coming-soon':  isEmpty(i + 1),
          'is-open':         !isLocked(i + 1) && !isCompleted(i + 1) && !isEmpty(i + 1),
        }"
        @click="go(i + 1)"
      >
        <div class="card-num">{{ i + 1 }}</div>
        <div class="card-title">{{ lv.title }}</div>
        <div class="card-count">
          <span v-if="!isEmpty(i + 1)">{{ lv.puzzles.length }} puzzles</span>
        </div>
        <div class="card-badge">
          <span v-if="isCompleted(i + 1)">✓ Complete</span>
          <span v-else-if="isEmpty(i + 1)">Coming Soon</span>
          <span v-else-if="isLocked(i + 1)">🔒 Locked</span>
          <span v-else>▶ Play</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LevelSelector',
  props: {
    category: { type: String, required: true },
    accent:   { type: String, default: '#e8d5a3' },
  },
  data() {
    return {
      levels:    [],
      completed: [],
      loadError: '',
    }
  },
  async created() {
    const levels = []
    for (let n = 1; n <= 3; n++) {
      const r = await fetch(`/puzzles/${this.category}/level_${n}.json`, { cache: 'no-store' })
      if (!r.ok) break
      levels.push(await r.json())
    }
    if (!levels.length) this.loadError = `No level files found in public/puzzles/${this.category}/`
    this.levels = levels
    const raw = localStorage.getItem(`sparks_done_${this.category}`)
    this.completed = raw ? JSON.parse(raw) : []
  },
  methods: {
    isEmpty(n) {
      const lv = this.levels[n - 1]
      return !lv || !lv.puzzles || lv.puzzles.length === 0
    },
    isCompleted(n) { return this.completed.includes(n) },
    isLocked(n) {
      if (n === 1) return false
      if (this.isEmpty(n)) return false   // coming-soon levels are always accessible
      // find nearest previous non-empty level
      for (let i = n - 1; i >= 1; i--) {
        if (!this.isEmpty(i)) return !this.completed.includes(i)
      }
      return false
    },
    go(n) {
      if (!this.isLocked(n)) this.$router.push(`/${this.category}/${n}`)
    },
  },
}
</script>

<style scoped>
.level-selector { width: 100%; }
.loading { color: rgba(255,255,255,0.4); padding: 40px; text-align: center; font-size: 15px; }
.error   { color: #f87171; padding: 20px; text-align: center; font-size: 14px; }

.level-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.level-card {
  border-radius: 14px;
  padding: 22px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  transition: transform 0.18s, box-shadow 0.18s;
  border: 1.5px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.03);
  user-select: none;
}

/* locked */
.level-card.is-locked {
  opacity: 0.35;
  cursor: not-allowed;
}

/* coming soon */
.level-card.is-coming-soon {
  border-color: rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.02);
  cursor: default;
}

/* playable */
.level-card.is-open {
  border-color: color-mix(in srgb, v-bind(accent) 35%, transparent);
  background: color-mix(in srgb, v-bind(accent) 4%, transparent);
}
.level-card.is-open:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 28px color-mix(in srgb, v-bind(accent) 18%, transparent);
  border-color: color-mix(in srgb, v-bind(accent) 70%, transparent);
}

/* completed */
.level-card.is-completed {
  border-color: rgba(34, 197, 94, 0.38);
  background: rgba(34, 197, 94, 0.05);
}
.level-card.is-completed:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(34, 197, 94, 0.14);
}

.card-num {
  font-size: 32px;
  font-weight: 900;
  line-height: 1;
  color: v-bind(accent);
}
.is-completed   .card-num { color: #22c55e; }
.is-locked      .card-num { color: rgba(255,255,255,0.25); }
.is-coming-soon .card-num { color: rgba(255,255,255,0.2); }

.card-title {
  font-size: 16px;
  font-weight: 700;
  color: #e0d0b0;
  margin-top: 4px;
}
.is-coming-soon .card-title { color: rgba(255,255,255,0.3); }

.card-count {
  font-size: 12px;
  color: rgba(255,255,255,0.35);
  letter-spacing: 0.05em;
  min-height: 16px;
}

.card-badge {
  margin-top: 10px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: v-bind(accent);
}
.is-completed   .card-badge { color: #22c55e; }
.is-locked      .card-badge { color: rgba(255,255,255,0.25); }
.is-coming-soon .card-badge { color: rgba(255,255,255,0.25); letter-spacing: 0.04em; }

@media (max-width: 640px) {
  .level-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .level-card  { padding: 18px 14px; }
  .card-num    { font-size: 26px; }
  .card-title  { font-size: 14px; }
  .card-badge  { font-size: 11px; }
}
</style>
