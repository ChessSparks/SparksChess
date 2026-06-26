<template>
  <div class="cat-page" :style="{ '--accent': accent }">

    <!-- header -->
    <header class="cat-header">
      <router-link to="/" class="back-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
      </router-link>
      <div class="cat-title-row">
        <span class="cat-icon">{{ icon }}</span>
        <h1 class="cat-title">{{ title }}</h1>
      </div>
      <div class="tab-bar">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-btn"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <span class="tab-icon">{{ tab.icon }}</span>
          {{ tab.label }}
        </button>
      </div>
    </header>

    <!-- tab panels -->
    <main class="cat-main">
      <slot :name="activeTab" />
    </main>

  </div>
</template>

<script>
export default {
  name: 'CategoryPage',
  props: {
    title:  { type: String, required: true },
    icon:   { type: String, required: true },
    accent: { type: String, default: '#e8d5a3' },
  },
  data() {
    return {
      activeTab: 'train',
      tabs: [
        { id: 'train',  icon: '♟', label: 'Training' },
        { id: 'videos', icon: '▶', label: 'Videos'   },
        { id: 'read',   icon: '📖', label: 'Read'     },
      ],
    }
  },
}
</script>

<style scoped>
.cat-page {
  min-height: 100vh;
  background: #0d0d0d;
  color: #e0d0b0;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

/* ── header ──────────────────────────────────────────── */
.cat-header {
  padding: 20px 32px 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 100%);
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: rgba(255,255,255,0.45);
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.05em;
  transition: color 0.2s;
  margin-bottom: 14px;
}

.back-btn svg { width: 16px; height: 16px; }
.back-btn:hover { color: var(--accent); }

.cat-title-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}

.cat-icon {
  font-size: 32px;
  filter: drop-shadow(0 0 8px var(--accent));
}

.cat-title {
  margin: 0;
  font-size: clamp(26px, 4vw, 42px);
  font-weight: 900;
  letter-spacing: 0.04em;
  color: var(--accent);
  text-shadow: 0 0 28px color-mix(in srgb, var(--accent) 35%, transparent);
}

/* ── tabs ────────────────────────────────────────────── */
.tab-bar {
  display: flex;
  gap: 4px;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 22px;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  color: rgba(255,255,255,0.4);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}

.tab-btn .tab-icon { font-size: 15px; }

.tab-btn:hover  { color: rgba(255,255,255,0.75); }
.tab-btn.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

/* ── main ────────────────────────────────────────────── */
.cat-main {
  flex: 1;
  padding: 32px;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
}

@media (max-width: 640px) {
  .cat-header { padding: 16px 16px 0; }
  .cat-main   { padding: 20px 16px; }
  .tab-btn    { padding: 10px 14px; font-size: 11px; }
}
</style>
