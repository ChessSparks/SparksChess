<template>
  <div class="training">

    <!-- level selector -->
    <div class="levels">
      <button
        v-for="n in 10"
        :key="n"
        class="level-btn"
        :class="{
          active:   currentLevel === n,
          solved:   solved.includes(n),
          locked:   n > maxUnlocked,
        }"
        :disabled="n > maxUnlocked"
        @click="loadLevel(n)"
      >
        <span v-if="solved.includes(n)" class="lv-check">✓</span>
        <span v-else>{{ n }}</span>
      </button>
    </div>

    <!-- puzzle info -->
    <div class="puzzle-meta">
      <div class="puzzle-label">
        Level {{ currentLevel }} — {{ currentPuzzle.label }}
      </div>
      <div class="puzzle-hint" v-if="showHint">{{ currentPuzzle.hint }}</div>
      <div class="puzzle-turn">
        {{ currentPuzzle.turn === 'w' ? '⬜ White' : '⬛ Black' }} to move
      </div>
    </div>

    <!-- board -->
    <div class="board-wrap">
      <TheChessboard
        :board-config="boardConfig"
        :player-color="currentPuzzle.turn"
        @move="onMove"
        reactive-config
      />
    </div>

    <!-- feedback -->
    <transition name="fade">
      <div v-if="feedback" class="feedback" :class="feedbackType">
        {{ feedback }}
      </div>
    </transition>

    <!-- controls -->
    <div class="controls">
      <button class="ctrl-btn" @click="resetPuzzle">↺ Reset</button>
      <button class="ctrl-btn hint" @click="showHint = !showHint">💡 Hint</button>
      <button v-if="solved.includes(currentLevel) && currentLevel < 10"
              class="ctrl-btn next" @click="loadLevel(currentLevel + 1)">
        Next →
      </button>
    </div>

    <!-- completed banner -->
    <div v-if="allSolved" class="completed">
      🏆 All 10 levels completed! Congratulations!
    </div>

  </div>
</template>

<script>
import { TheChessboard } from 'vue3-chessboard'
import 'vue3-chessboard/style.css'

export default {
  name: 'TrainingBoard',
  components: { TheChessboard },
  props: {
    puzzles: { type: Array, required: true },
    accent:  { type: String, default: '#e8d5a3' },
  },
  data() {
    return {
      currentLevel: 1,
      solved: [],
      feedback: '',
      feedbackType: '',
      showHint: false,
      boardConfig: {},
    }
  },
  computed: {
    currentPuzzle() { return this.puzzles[this.currentLevel - 1] },
    maxUnlocked()   { return Math.min(10, (this.solved.length ? Math.max(...this.solved) : 0) + 1) },
    allSolved()     { return this.solved.length === 10 },
  },
  mounted() {
    this.loadLevel(1)
  },
  methods: {
    loadLevel(n) {
      this.currentLevel = n
      this.feedback = ''
      this.showHint = false
      const p = this.puzzles[n - 1]
      this.boardConfig = {
        fen: p.fen,
        orientation: p.turn === 'w' ? 'white' : 'black',
        movable: { color: p.turn === 'w' ? 'white' : 'black', free: false },
      }
    },
    onMove(move) {
      const p = this.currentPuzzle
      if (move.from === p.solution[0] && move.to === p.solution[1]) {
        this.feedback = '✓ Correct! Well done.'
        this.feedbackType = 'correct'
        if (!this.solved.includes(this.currentLevel)) {
          this.solved.push(this.currentLevel)
        }
      } else {
        this.feedback = '✗ Not quite — try again!'
        this.feedbackType = 'wrong'
        setTimeout(() => this.resetPuzzle(), 900)
      }
    },
    resetPuzzle() {
      this.feedback = ''
      this.showHint = false
      const p = this.currentPuzzle
      this.boardConfig = {
        fen: p.fen,
        orientation: p.turn === 'w' ? 'white' : 'black',
        movable: { color: p.turn === 'w' ? 'white' : 'black', free: false },
      }
    },
  },
}
</script>

<style scoped>
.training {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

/* ── level buttons ─────────────────────────────────────── */
.levels {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.level-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.5);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.18s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.level-btn:not(.locked):hover {
  border-color: v-bind(accent);
  color: v-bind(accent);
}

.level-btn.active {
  border-color: v-bind(accent);
  background: color-mix(in srgb, v-bind(accent) 18%, transparent);
  color: v-bind(accent);
  box-shadow: 0 0 14px color-mix(in srgb, v-bind(accent) 30%, transparent);
}

.level-btn.solved {
  border-color: #22c55e;
  background: rgba(34,197,94,0.12);
  color: #22c55e;
}

.level-btn.locked {
  opacity: 0.28;
  cursor: not-allowed;
}

.lv-check { font-size: 16px; }

/* ── puzzle meta ──────────────────────────────────────── */
.puzzle-meta {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.puzzle-label {
  font-size: 18px;
  font-weight: 700;
  color: #e0d0b0;
  letter-spacing: 0.04em;
}

.puzzle-turn {
  font-size: 13px;
  color: rgba(255,255,255,0.45);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.puzzle-hint {
  font-size: 13px;
  color: #fbbf24;
  font-style: italic;
  padding: 6px 14px;
  background: rgba(251,191,36,0.08);
  border-radius: 8px;
  border: 1px solid rgba(251,191,36,0.2);
}

/* ── board ────────────────────────────────────────────── */
.board-wrap {
  width: min(480px, 90vw);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0,0,0,0.6);
}

/* ── feedback ─────────────────────────────────────────── */
.feedback {
  padding: 10px 28px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.feedback.correct {
  background: rgba(34,197,94,0.15);
  border: 1px solid rgba(34,197,94,0.4);
  color: #4ade80;
}

.feedback.wrong {
  background: rgba(239,68,68,0.12);
  border: 1px solid rgba(239,68,68,0.35);
  color: #f87171;
}

/* ── controls ─────────────────────────────────────────── */
.controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.ctrl-btn {
  padding: 9px 22px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.14);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.7);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: all 0.18s;
}

.ctrl-btn:hover { background: rgba(255,255,255,0.11); color: #fff; }

.ctrl-btn.next {
  background: color-mix(in srgb, v-bind(accent) 18%, transparent);
  border-color: color-mix(in srgb, v-bind(accent) 50%, transparent);
  color: v-bind(accent);
}

.ctrl-btn.next:hover {
  background: color-mix(in srgb, v-bind(accent) 28%, transparent);
}

/* ── completed ────────────────────────────────────────── */
.completed {
  padding: 16px 32px;
  border-radius: 12px;
  background: rgba(34,197,94,0.1);
  border: 1px solid rgba(34,197,94,0.3);
  color: #4ade80;
  font-size: 18px;
  font-weight: 700;
  text-align: center;
}

/* ── transitions ──────────────────────────────────────── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
</style>
