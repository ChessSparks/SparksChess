<template>
  <div class="cat-page" :style="{ '--accent': accent }">

    <!-- header: back + tabs in one row -->
    <header class="cat-header">
      <router-link to="/" class="back-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        Back
      </router-link>

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
  padding-top: 64px; /* account for fixed NavBar */
  background: #0d0d0d;
  color: #e0d0b0;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

/* ── header ──────────────────────────────────────────── */
.cat-header {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 32px;
  height: 56px;
  background: rgba(13,13,13,0.92);
  position: sticky;
  top: 64px; /* stick just below the NavBar */
  z-index: 20;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255,255,255,0.07);
  flex-shrink: 0;
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
.back-btn svg { width: 15px; height: 15px; }
.back-btn:hover { color: var(--accent); }

/* ── tabs ────────────────────────────────────────────── */
.tab-bar {
  display: flex;
  gap: 2px;
  height: 100%;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 0 22px;
  height: 100%;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  color: rgba(255,255,255,0.38);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}

.tab-btn .tab-icon { font-size: 15px; }
.tab-btn:hover  { color: rgba(255,255,255,0.72); }
.tab-btn.active { color: var(--accent); border-bottom-color: var(--accent); }

/* ── main ────────────────────────────────────────────── */
.cat-main {
  flex: 1;
  padding: 36px 32px;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
}

@media (max-width: 640px) {
  /* keep NavBar space — don't zero it out */
  .cat-page { padding-top: 64px; }

  /* stack back-btn above tab-bar */
  .cat-header {
    top: 64px;
    padding: 0;
    height: auto;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }

  .back-btn {
    padding: 10px 16px;
    font-size: 12px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  /* tabs fill full width */
  .tab-bar {
    width: 100%;
    height: 46px;
    gap: 0;
  }

  .tab-btn {
    flex: 1;
    justify-content: center;
    padding: 0 4px;
    font-size: 10px;
    letter-spacing: 0.04em;
    gap: 4px;
  }

  .tab-btn .tab-icon { font-size: 13px; }

  .cat-main { padding: 20px 16px; }
}
</style>
