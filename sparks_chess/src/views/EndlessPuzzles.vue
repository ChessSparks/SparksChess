<template>
  <div class="endless-page">

    <!-- background -->
    <div class="ep-bg" />
    <div class="ep-overlay" />

    <!-- loading screen -->
    <transition name="loader-fade">
      <div v-if="loading" class="loader">
        <div class="loader-bg" />

        <div class="loader-content">
          <div class="infinity-wrap">
            <svg class="infinity-svg" viewBox="0 0 120 60" fill="none">
              <path class="inf-track" d="M60 30 C60 30 45 10 30 10 C13 10 2 20 2 30 C2 40 13 50 30 50 C45 50 60 30 60 30 C60 30 75 10 90 10 C107 10 118 20 118 30 C118 40 107 50 90 50 C75 50 60 30 60 30 Z" stroke="#1a1a1a" stroke-width="6" fill="none"/>
              <path class="inf-line"  d="M60 30 C60 30 45 10 30 10 C13 10 2 20 2 30 C2 40 13 50 30 50 C45 50 60 30 60 30 C60 30 75 10 90 10 C107 10 118 20 118 30 C118 40 107 50 90 50 C75 50 60 30 60 30 Z" stroke="#22c55e" stroke-width="6" fill="none"/>
            </svg>
            <div class="glow-dot" />
          </div>

          <h1 class="loader-title">
            <span class="word-endless">Endless</span>
            <span class="word-puzzles">Puzzles</span>
          </h1>

          <div class="loader-dots">
            <span /><span /><span />
          </div>
        </div>
      </div>
    </transition>

    <!-- header -->
    <header class="endless-header">
      <router-link to="/" class="back-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        Back
      </router-link>
      <span class="endless-title">Endless Puzzles</span>
    </header>

    <!-- iframe wrapper — separate from overlay so touch reaches the frame -->
    <main class="endless-body">
      <div class="frame-wrap">
        <iframe
          src="https://livetactics.chessbase.com"
          width="400"
          height="440"
          frameborder="0"
          scrolling="yes"
          allowfullscreen
          allow="autoplay; fullscreen"
          class="tactics-frame"
        />
      </div>
    </main>

  </div>
</template>

<script>
export default {
  name: 'EndlessPuzzles',
  data() {
    return { loading: true }
  },
  mounted() {
    setTimeout(() => { this.loading = false }, 3000)
  },
}
</script>

<style scoped>
/* ── page ───────────────────────────────────────────────── */
.endless-page {
  min-height: 100vh;
  padding-top: 64px;
  color: #e0d0b0;
  font-family: 'Segoe UI', system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  position: relative;
}

.ep-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  background-image: url('../assets/endless-tactics-shwd.png');
  background-size: cover;
  background-position: center;
}

.ep-overlay {
  position: fixed;
  inset: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.32);
}

/* ── loader ─────────────────────────────────────────────── */
.loader {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.loader-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, #0a1a0f 0%, #050d05 50%, #000 100%);
}

.loader-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

/* ── infinity SVG ───────────────────────────────────────── */
.infinity-wrap {
  position: relative;
  width: 160px;
  height: 80px;
}

.infinity-svg {
  width: 160px;
  height: 80px;
  overflow: visible;
  filter: drop-shadow(0 0 18px rgba(34,197,94,0.5));
}

.inf-line {
  stroke-dasharray: 380;
  stroke-dashoffset: 380;
  animation: drawInfinity 1.4s cubic-bezier(0.4,0,0.2,1) 0.2s forwards,
             pulseStroke 2s ease-in-out 1.6s infinite;
  stroke-linecap: round;
}

@keyframes drawInfinity {
  to { stroke-dashoffset: 0; }
}
@keyframes pulseStroke {
  0%, 100% { opacity: 1;   filter: drop-shadow(0 0  6px #22c55e); }
  50%       { opacity: 0.6; filter: drop-shadow(0 0 22px #22c55e); }
}

.glow-dot {
  position: absolute;
  top: 50%; left: 50%;
  width: 10px; height: 10px;
  margin: -5px 0 0 -5px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 12px 4px rgba(34,197,94,0.8);
  animation: orbitDot 1.8s ease-in-out 1.6s infinite;
}

@keyframes orbitDot {
  0%   { transform: translate(-38px, -20px); opacity: 1;   }
  25%  { transform: translate(-38px,  20px); opacity: 0.6; }
  50%  { transform: translate(  0px,   0px); opacity: 1;   }
  75%  { transform: translate( 38px, -20px); opacity: 0.6; }
  100% { transform: translate( 38px,  20px); opacity: 1;   }
}

/* ── loader title & dots ────────────────────────────────── */
.loader-title {
  display: flex;
  gap: 16px;
  margin: 0;
  font-size: clamp(32px, 6vw, 56px);
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.word-endless {
  color: #22c55e;
  opacity: 0;
  transform: translateX(-30px);
  animation: slideRight 0.7s cubic-bezier(0.16,1,0.3,1) 0.8s forwards;
  text-shadow: 0 0 40px rgba(34,197,94,0.4);
}
.word-puzzles {
  color: #e8d5a3;
  opacity: 0;
  transform: translateX(30px);
  animation: slideLeft  0.7s cubic-bezier(0.16,1,0.3,1) 1s   forwards;
}

@keyframes slideRight { to { opacity: 1; transform: translateX(0); } }
@keyframes slideLeft  { to { opacity: 1; transform: translateX(0); } }

.loader-dots {
  display: flex;
  gap: 10px;
  opacity: 0;
  animation: epFadeIn 0.4s ease 1.4s forwards;
}
.loader-dots span {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #22c55e;
  animation: epBounce 0.9s ease-in-out infinite;
}
.loader-dots span:nth-child(2) { animation-delay: 0.15s; }
.loader-dots span:nth-child(3) { animation-delay: 0.30s; }

@keyframes epBounce {
  0%, 100% { transform: translateY(0);    opacity: 0.4; }
  50%       { transform: translateY(-8px); opacity: 1;   }
}
@keyframes epFadeIn { to { opacity: 1; } }

.loader-fade-leave-active { transition: opacity 0.6s ease, transform 0.6s ease; }
.loader-fade-leave-to     { opacity: 0; transform: scale(1.04); }

/* ── header ─────────────────────────────────────────────── */
.endless-header {
  position: sticky;
  top: 64px;
  z-index: 20;
  height: 52px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 32px;
  background: rgba(5, 12, 5, 0.82);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(34,197,94,0.15);
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
  flex-shrink: 0;
  transition: color 0.2s;
}
.back-btn svg   { width: 15px; height: 15px; }
.back-btn:hover { color: #22c55e; }

.endless-title {
  font-size: 15px;
  font-weight: 800;
  color: #22c55e;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

/* ── body & frame ───────────────────────────────────────── */
.endless-body {
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 36px 24px 60px;
}

.frame-wrap {
  width: 400px;
  height: 440px;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 12px 60px rgba(0,0,0,0.75);
  border: 1px solid rgba(34,197,94,0.28);
  background: rgba(8, 18, 8, 0.45);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  isolation: isolate;
}

.tactics-frame {
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  /* let the iframe's own JS handle all pointer/touch events */
  touch-action: auto;
  pointer-events: auto;
}

/* ── mobile ─────────────────────────────────────────────── */
@media (max-width: 640px) {
  .endless-page   { padding-top: 64px; }
  .endless-header { top: 64px; padding: 0 16px; }

  /* remove all padding — iframe fills remaining viewport exactly */
  .endless-body {
    padding: 0;
    align-items: stretch;
  }

  .frame-wrap {
    width: 100%;
    /* 64px NavBar + 52px header = 116px taken */
    height: calc(100vh - 116px);
    border-radius: 0;
    box-shadow: none;
    border: none;
  }

  .tactics-frame {
    width: 100%;
    height: 100%;
  }
}
</style>
