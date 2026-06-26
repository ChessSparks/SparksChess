<template>
  <div class="landing" @mousemove="onMouseMove">
    <div class="bg" :style="{ transform: `translate(${shift.x}px, ${shift.y}px) scale(1.07)` }" />
    <div class="overlay" />

    <!-- hero title only -->
    <div class="hero">
      <h1 class="hero-title">SparksChess</h1>
    </div>

    <!-- social icons top-right -->
    <div class="social">
      <a class="social-btn youtube"
         href="https://www.youtube.com/@SparksChess"
         target="_blank" rel="noopener" aria-label="YouTube">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.8 8s-.2-1.4-.8-2c-.76-.8-1.6-.81-2-.86C16.8 5 12 5 12 5s-4.8 0-7 .14c-.4.05-1.24.06-2 .86-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.6c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.76.8 1.76.78 2.2.86C6.8 19 12 19 12 19s4.8 0 7-.14c.4-.05 1.24-.06 2-.86.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.6C22 9.6 21.8 8 21.8 8zM9.75 14.5v-5.5l5.5 2.76-5.5 2.74z"/>
        </svg>
      </a>
      <a class="social-btn bmc"
         href="https://buymeacoffee.com/sparkschess"
         target="_blank" rel="noopener" aria-label="Buy me a coffee">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4v-2z"/>
        </svg>
      </a>
    </div>

    <!-- left nav: Tactics + Mates -->
    <nav class="side-nav nav-left">
      <router-link
        v-for="item in leftItems"
        :key="item.path"
        :to="item.path"
        class="nav-pill pill-left"
        :style="{ '--c': item.color }"
      >
        <span class="pill-icon" :style="{ color: item.color }">
          <NavIcon :name="item.icon" />
        </span>
        <span class="pill-label" :style="{ color: item.color }">{{ item.label }}</span>
      </router-link>
    </nav>

    <!-- right nav: Endgames + Openings -->
    <nav class="side-nav nav-right">
      <router-link
        v-for="item in rightItems"
        :key="item.path"
        :to="item.path"
        class="nav-pill pill-right"
        :style="{ '--c': item.color }"
      >
        <span class="pill-label" :style="{ color: item.color }">{{ item.label }}</span>
        <span class="pill-icon" :style="{ color: item.color }">
          <NavIcon :name="item.icon" />
        </span>
      </router-link>
    </nav>

    <!-- mobile bottom nav -->
    <nav class="mobile-nav">
      <router-link
        v-for="item in allItems"
        :key="item.path"
        :to="item.path"
        class="mobile-pill"
        :style="{ '--c': item.color }"
      >
        <span class="mobile-icon" :style="{ color: item.color }">
          <NavIcon :name="item.icon" />
        </span>
        <span class="mobile-label">{{ item.label }}</span>
      </router-link>
    </nav>

    <!-- footer subtitle -->
    <div class="footer-sub">
      <div class="footer-pill">
        <span
          v-for="(item, i) in subWords"
          :key="item.w"
          class="sub-word"
          :style="`--i:${i}; color: ${item.color}`"
        >{{ item.w }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import NavIcon from '../components/NavIcon.vue'

export default {
  name: 'LandingPage',
  components: { NavIcon },
  data() {
    return {
      shift: { x: 0, y: 0 },
      subWords: [
        { w: 'Think.', color: '#F59E0B' },
        { w: 'Learn.', color: '#EF4444' },
        { w: 'Play.',  color: '#A78BFA' },
        { w: 'Grow.',  color: '#22D3EE' },
      ],
      leftItems: [
        { path: '/tactics',  icon: 'tactics',  color: '#F59E0B', label: 'Tactics'  },
        { path: '/mates',    icon: 'mates',    color: '#EF4444', label: 'Mates'    },
      ],
      rightItems: [
        { path: '/endgames', icon: 'endgames', color: '#A78BFA', label: 'Endgames' },
        { path: '/openings', icon: 'openings', color: '#22D3EE', label: 'Openings' },
      ],
    }
  },
  computed: {
    allItems() { return [...this.leftItems, ...this.rightItems] },
  },
  methods: {
    onMouseMove(e) {
      const x = ((e.clientX / window.innerWidth)  - 0.5) * -22
      const y = ((e.clientY / window.innerHeight) - 0.5) * -14
      this.shift = { x, y }
    },
  },
}
</script>

<style scoped>
/* ─── base ─────────────────────────────────────────────── */
.landing {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.bg {
  position: absolute;
  inset: -4%;
  background-image: url('../assets/background-image.png');
  background-size: cover;
  background-position: center;
  will-change: transform;
  transition: transform 0.12s ease-out;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    rgba(0,0,0,0.60) 0%,
    rgba(0,0,0,0.18) 45%,
    rgba(0,0,0,0.55) 100%
  );
  pointer-events: none;
}

/* ─── keyframes ──────────────────────────────────────────── */
@keyframes titleIn {
  0%   { opacity: 0; letter-spacing: 0.35em; transform: translateY(-16px); }
  100% { opacity: 1; letter-spacing: 0.07em; transform: translateY(0); }
}

@keyframes glow {
  0%, 100% { text-shadow: 0 0 18px rgba(232,213,163,0.25), 0 4px 28px rgba(0,0,0,0.7); }
  50%       { text-shadow: 0 0 40px rgba(232,213,163,0.52), 0 4px 28px rgba(0,0,0,0.7); }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ─── hero ───────────────────────────────────────────────── */
.hero {
  position: absolute;
  top: 6%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 10;
  pointer-events: none;
  white-space: nowrap;
}

.hero-title {
  margin: 0;
  font-size: clamp(52px, 9vw, 96px);
  font-weight: 900;
  color: #e8d5a3;
  letter-spacing: 0.07em;
  animation:
    titleIn 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both,
    glow    3.6s ease-in-out 1.4s infinite;
}

/* ─── social ─────────────────────────────────────────────── */
.social {
  position: absolute;
  top: 26px;
  right: 32px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 10;
}

.social-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(10, 10, 10, 0.52);
  border: 1px solid rgba(255,255,255,0.12);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s, transform 0.15s;
}

.social-btn svg { width: 18px; height: 18px; }

.social-btn.youtube { color: #ff3d3d; border-color: rgba(255,61,61,0.3); }
.social-btn.youtube:hover {
  background: rgba(255,61,61,0.18);
  border-color: rgba(255,61,61,0.7);
  transform: scale(1.1);
}

.social-btn.bmc { color: #fbbf24; border-color: rgba(251,191,36,0.25); }
.social-btn.bmc:hover {
  background: rgba(251,191,36,0.14);
  border-color: rgba(251,191,36,0.6);
  transform: scale(1.1);
}

/* ─── side navs ──────────────────────────────────────────── */
.side-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 18px;
  z-index: 10;
}

.nav-left  { left: 32px;  align-items: flex-start; }
.nav-right { right: 32px; align-items: flex-end;   }

/* ─── pill ───────────────────────────────────────────────── */
.nav-pill {
  display: flex;
  align-items: center;
  height: 70px;
  border-radius: 999px;
  background: rgba(10, 10, 10, 0.48);
  border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(14px);
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
  transition:
    background   0.22s ease,
    border-color 0.22s ease,
    box-shadow   0.22s ease;
}

.nav-pill:hover {
  background: color-mix(in srgb, var(--c) 10%, transparent);
  border-color: color-mix(in srgb, var(--c) 55%, transparent);
  box-shadow: 0 0 26px color-mix(in srgb, var(--c) 22%, transparent);
}

/* icon slot */
.pill-icon {
  flex-shrink: 0;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pill-icon svg { width: 30px; height: 30px; }

/* label */
.pill-label {
  white-space: nowrap;
  max-width: 0;
  overflow: hidden;
  opacity: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0;
  transition:
    max-width 0.35s ease,
    opacity   0.22s ease 0.1s,
    padding   0.35s ease;
}

/* left pills: icon left, label slides right */
.pill-left { flex-direction: row; }
.pill-left:hover .pill-label {
  max-width: 140px;
  opacity: 1;
  padding: 0 22px 0 0;
}

/* right pills: label slides left, icon right */
.pill-right { flex-direction: row; }
.pill-right:hover .pill-label {
  max-width: 140px;
  opacity: 1;
  padding: 0 0 0 22px;
}

/* ─── footer subtitle ────────────────────────────────────── */
.footer-sub {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  pointer-events: none;
  white-space: nowrap;
}

.footer-pill {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 10px 24px;
  background: rgba(0, 0, 0, 0.38);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
}

.sub-word {
  display: inline-block;
  font-size: clamp(16px, 2vw, 22px);
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0;
  animation: fadeUp 0.5s ease forwards;
  animation-delay: calc(1.1s + var(--i) * 0.18s);
}

/* ─── mobile nav ─────────────────────────────────────────── */
.mobile-nav { display: none; }

/* ─── responsive ──────────────────────────────────────────── */
@media (max-width: 640px) {
  .side-nav { display: none; }

  .hero-title { letter-spacing: 0.04em; }

  .mobile-nav {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    position: absolute;
    bottom: 24px;
    left: 14px;
    right: 14px;
    z-index: 10;
  }

  .mobile-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 16px;
    height: 54px;
    border-radius: 999px;
    background: rgba(10, 10, 10, 0.60);
    border: 1px solid color-mix(in srgb, var(--c) 35%, transparent);
    backdrop-filter: blur(12px);
    text-decoration: none;
    color: #e8d5a3;
    cursor: pointer;
  }

  .mobile-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  .mobile-icon svg { width: 20px; height: 20px; }

  .mobile-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  /* subtitle above pills on mobile */
  .footer-sub {
    bottom: 162px;
    gap: 10px;
  }

  .sub-word { font-size: 13px; letter-spacing: 0.15em; }
}
</style>
