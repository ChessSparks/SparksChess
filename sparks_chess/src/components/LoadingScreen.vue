<template>
  <transition name="ls-fade">
    <div v-if="show" class="ls" :style="{ '--accent': color }">
      <div class="ls-bg" :style="{ background: bgGrad }" />

      <div class="ls-body">

        <!-- icon -->
        <div class="icon-wrap">

          <!-- MATES: crosshair draws in, dot pops, lines shoot out -->
          <svg v-if="type === 'mates'" class="ls-svg" viewBox="0 0 24 24" fill="none" overflow="visible">
            <circle class="m-ring" cx="12" cy="12" r="9"  stroke-width="1.5"/>
            <line   class="m-l"    x1="12" y1="2"  x2="12" y2="6"  stroke-width="1.5" stroke-linecap="round"/>
            <line   class="m-l"    x1="12" y1="18" x2="12" y2="22" stroke-width="1.5" stroke-linecap="round"/>
            <line   class="m-l"    x1="2"  y1="12" x2="6"  y2="12" stroke-width="1.5" stroke-linecap="round"/>
            <line   class="m-l"    x1="18" y1="12" x2="22" y2="12" stroke-width="1.5" stroke-linecap="round"/>
            <circle class="m-dot"  cx="12" cy="12" r="3.5"/>
          </svg>

          <!-- TACTICS: bolt draws then fills with a flash -->
          <svg v-else-if="type === 'tactics'" class="ls-svg" viewBox="0 0 24 24" fill="none" overflow="visible">
            <path class="t-bolt" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"
                  d="M13 2L3 14h8L9 22l12-12h-8z"/>
          </svg>

          <!-- ENDGAMES: hourglass draws, sand falls through -->
          <svg v-else-if="type === 'endgames'" class="ls-svg" viewBox="0 0 24 24" fill="none" overflow="visible">
            <line   class="e-bar"   x1="5" y1="2"  x2="19" y2="2"  stroke-width="2"   stroke-linecap="round"/>
            <line   class="e-bar"   x1="5" y1="22" x2="19" y2="22" stroke-width="2"   stroke-linecap="round"/>
            <path   class="e-upper" stroke-width="1.5" stroke-linejoin="round"
                    d="M7 2v4.17a2 2 0 0 0 .59 1.42L12 12l4.41-4.41A2 2 0 0 0 17 6.17V2"/>
            <path   class="e-lower" stroke-width="1.5" stroke-linejoin="round"
                    d="M17 22v-4.17a2 2 0 0 0-.59-1.42L12 12l-4.41 4.41A2 2 0 0 0 7 17.83V22"/>
            <circle class="e-s1"   cx="12"  cy="6.8"  r="0.9"/>
            <circle class="e-s2"   cx="10.2" cy="8.8"  r="0.8"/>
            <circle class="e-s3"   cx="13.8" cy="9.2"  r="0.8"/>
            <circle class="e-s4"   cx="12"   cy="11.2" r="0.9"/>
          </svg>

          <!-- OPENINGS: book pages draw in one after another -->
          <svg v-else-if="type === 'openings'" class="ls-svg" viewBox="0 0 24 24" fill="none" overflow="visible">
            <path class="o-left"  stroke-width="1.5" stroke-linejoin="round"
                  d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path class="o-right" stroke-width="1.5" stroke-linejoin="round"
                  d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
        </div>

        <!-- title words -->
        <h1 class="ls-title">
          <span
            v-for="(w, i) in words"
            :key="i"
            class="ls-word"
            :style="{ '--wi': i, color: i % 2 === 0 ? color : '#e8d5a3' }"
          >{{ w }}</span>
        </h1>

        <!-- bouncing dots -->
        <div class="ls-dots">
          <span /><span /><span />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LoadingScreen',
  props: {
    show:  { type: Boolean, required: true },
    type:  { type: String,  required: true },
    color: { type: String,  required: true },
    title: { type: String,  required: true },
  },
  computed: {
    words() { return this.title.split(' ') },
    bgGrad() {
      return {
        mates:    'radial-gradient(ellipse at center, #1a0505 0%, #070003 55%, #000 100%)',
        tactics:  'radial-gradient(ellipse at center, #1a0e00 0%, #070500 55%, #000 100%)',
        endgames: 'radial-gradient(ellipse at center, #0e0a1c 0%, #050410 55%, #000 100%)',
        openings: 'radial-gradient(ellipse at center, #001520 0%, #000a10 55%, #000 100%)',
      }[this.type] || 'radial-gradient(ellipse at center, #0d0d0d, #000)'
    },
  },
}
</script>

<style scoped>
/* ── overlay ─────────────────────────────────────── */
.ls {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.ls-bg {
  position: absolute;
  inset: 0;
}
.ls-body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

/* ── icon wrapper ────────────────────────────────── */
.icon-wrap {
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ls-glow 2s ease-in-out 1.5s infinite alternate;
}
.ls-svg { width: 110px; height: 110px; overflow: visible; }

@keyframes ls-glow {
  0%   { filter: drop-shadow(0 0  8px var(--accent)); }
  100% { filter: drop-shadow(0 0 30px var(--accent)); }
}

/* ── shared keyframes ────────────────────────────── */
@keyframes ls-draw   { to { stroke-dashoffset: 0; } }
@keyframes ls-fadeIn { to { opacity: 1; } }
@keyframes ls-popIn  { to { opacity: 1; transform: scale(1); } }
@keyframes ls-wordUp { to { opacity: 1; transform: translateY(0); } }

/* ── MATES ───────────────────────────────────────── */
.m-ring {
  stroke: var(--accent);
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  animation: ls-draw 1s ease-out 0.2s forwards;
}
.m-l {
  stroke: var(--accent);
  opacity: 0;
  animation: ls-fadeIn 0.35s ease 1.15s forwards;
}
.m-dot {
  fill: var(--accent);
  opacity: 0;
  transform: scale(0);
  transform-origin: center;
  animation: ls-popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 1.4s forwards;
}

/* ── TACTICS ─────────────────────────────────────── */
.t-bolt {
  stroke: var(--accent);
  fill: transparent;
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  animation: ls-draw 0.8s ease-out 0.2s forwards, ls-boltFill 0.35s ease 1s forwards;
}
@keyframes ls-boltFill {
  from { fill: transparent; }
  to   { fill: var(--accent); }
}

/* ── ENDGAMES ────────────────────────────────────── */
.e-bar {
  stroke: var(--accent);
  opacity: 0;
  animation: ls-fadeIn 0.3s ease 0.2s forwards;
}
.e-upper {
  stroke: var(--accent);
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  animation: ls-draw 0.7s ease-out 0.5s forwards;
}
.e-lower {
  stroke: var(--accent);
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  animation: ls-draw 0.7s ease-out 0.85s forwards;
}
.e-s1, .e-s2, .e-s3, .e-s4 {
  fill: var(--accent);
  opacity: 0;
}
.e-s1 { animation: ls-sand 0.9s ease-in 1.3s  infinite; }
.e-s2 { animation: ls-sand 0.9s ease-in 1.55s infinite; }
.e-s3 { animation: ls-sand 0.9s ease-in 1.8s  infinite; }
.e-s4 { animation: ls-sand 0.9s ease-in 2.05s infinite; }
@keyframes ls-sand {
  0%   { opacity: 0; transform: translateY(-2px); }
  20%  { opacity: 0.9; }
  80%  { opacity: 0.9; }
  100% { opacity: 0;   transform: translateY(7px); }
}

/* ── OPENINGS ────────────────────────────────────── */
.o-left {
  stroke: var(--accent);
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  animation: ls-draw 0.9s ease-out 0.3s forwards;
}
.o-right {
  stroke: var(--accent);
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  animation: ls-draw 0.9s ease-out 0.75s forwards;
}

/* ── title ───────────────────────────────────────── */
.ls-title {
  display: flex;
  gap: 14px;
  margin: 0;
  font-size: clamp(28px, 5vw, 50px);
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-family: 'Segoe UI', system-ui, sans-serif;
}
.ls-word {
  display: inline-block;
  opacity: 0;
  transform: translateY(22px);
  animation: ls-wordUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(0.9s + var(--wi) * 0.15s);
}

/* ── dots ────────────────────────────────────────── */
.ls-dots {
  display: flex;
  gap: 10px;
  opacity: 0;
  animation: ls-fadeIn 0.4s ease 1.5s forwards;
}
.ls-dots span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  animation: ls-bounce 0.9s ease-in-out infinite;
}
.ls-dots span:nth-child(2) { animation-delay: 0.15s; }
.ls-dots span:nth-child(3) { animation-delay: 0.30s; }
@keyframes ls-bounce {
  0%, 100% { transform: translateY(0);    opacity: 0.35; }
  50%       { transform: translateY(-9px); opacity: 1;   }
}

/* ── exit transition ─────────────────────────────── */
.ls-fade-leave-active {
  transition: opacity 0.65s ease, transform 0.65s ease;
}
.ls-fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>
