<template>
  <div class="training">

    <!-- level selector -->
    <div class="levels">
      <button
        v-for="n in puzzles.length" :key="n"
        class="level-btn"
        :class="{ active: currentLevel === n, solved: solved.includes(n), locked: n > maxUnlocked }"
        :disabled="n > maxUnlocked"
        @click="loadLevel(n)"
      >
        <span v-if="solved.includes(n)">✓</span>
        <span v-else>{{ n }}</span>
      </button>
    </div>

    <!-- puzzle info -->
    <div class="puzzle-meta">
      <div class="puzzle-label">Level {{ currentLevel }} — {{ currentPuzzle.label }}</div>
      <div class="puzzle-turn">{{ currentPuzzle.turn === 'w' ? '⬜ White' : '⬛ Black' }} to move</div>
      <div v-if="showHint" class="puzzle-hint">{{ currentPuzzle.hint }}</div>
    </div>

    <!-- board — key forces full remount on level/reset change -->
    <div class="board-wrap">
      <TheChessboard
        :key="boardKey"
        :board-config="currentConfig"
        @move="onMove"
      />
    </div>

    <!-- feedback -->
    <transition name="fade">
      <div v-if="feedback" class="feedback" :class="feedbackType">{{ feedback }}</div>
    </transition>

    <!-- controls -->
    <div class="controls">
      <button class="ctrl-btn" @click="resetPuzzle">↺ Reset</button>
      <button class="ctrl-btn" @click="showHint = !showHint">💡 Hint</button>
      <button v-if="solved.includes(currentLevel) && currentLevel < puzzles.length"
              class="ctrl-btn next" @click="loadLevel(currentLevel + 1)">
        Next →
      </button>
    </div>

  </div>
</template>

<script>
import { TheChessboard } from 'vue3-chessboard'
import 'vue3-chessboard/style.css'

export default {
  name: 'TrainingBoard',
  components: { TheChessboard },
  emits: ['complete'],
  props: {
    puzzles: { type: Array, required: true },
    accent:  { type: String, default: '#e8d5a3' },
  },
  data() {
    return {
      currentLevel: 1,
      boardKey: 0,
      solved: [],
      feedback: '',
      feedbackType: '',
      showHint: false,
    }
  },
  computed: {
    currentPuzzle() { return this.puzzles[this.currentLevel - 1] },
    maxUnlocked()   { return Math.min(this.puzzles.length, (this.solved.length ? Math.max(...this.solved) : 0) + 1) },
    allSolved()     { return this.solved.length === this.puzzles.length },
    currentConfig() {
      const p = this.currentPuzzle
      return {
        fen: p.fen,
        orientation: p.turn === 'w' ? 'white' : 'black',
        movable: {
          color: p.turn === 'w' ? 'white' : 'black',
          free: false,
        },
      }
    },
  },
  methods: {
    loadLevel(n) {
      this.currentLevel = n
      this.feedback = ''
      this.showHint = false
      this.boardKey++
    },
    resetPuzzle() {
      this.feedback = ''
      this.showHint = false
      this.boardKey++
    },
    onMove(move) {
      // vue3-chessboard v1.x emits the chess.js Move object directly
      const from = move.from
      const to   = move.to
      const [sf, st] = this.currentPuzzle.solution
      if (from === sf && to === st) {
        this.feedback = '✓ Correct! Well done.'
        this.feedbackType = 'correct'
        if (!this.solved.includes(this.currentLevel)) {
          this.solved.push(this.currentLevel)
          if (this.solved.length === this.puzzles.length) {
            this.$emit('complete')
          }
        }
      } else {
        this.feedback = '✗ Not quite — try again!'
        this.feedbackType = 'wrong'
        setTimeout(() => this.resetPuzzle(), 850)
      }
    },
  },
}
</script>

<style scoped>
.training { display: flex; flex-direction: column; gap: 20px; align-items: center; }

/* levels */
.levels { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }

.level-btn {
  width: 46px; height: 46px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.12);
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.45);
  font-size: 14px; font-weight: 700;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.18s;
}
.level-btn:not(.locked):hover { border-color: v-bind(accent); color: v-bind(accent); }
.level-btn.active {
  border-color: v-bind(accent);
  background: color-mix(in srgb, v-bind(accent) 18%, transparent);
  color: v-bind(accent);
  box-shadow: 0 0 14px color-mix(in srgb, v-bind(accent) 28%, transparent);
}
.level-btn.solved { border-color: #22c55e; background: rgba(34,197,94,0.1); color: #22c55e; }
.level-btn.locked { opacity: 0.25; cursor: not-allowed; }

/* meta */
.puzzle-meta { text-align: center; display: flex; flex-direction: column; gap: 4px; }
.puzzle-label { font-size: 18px; font-weight: 700; color: #e0d0b0; }
.puzzle-turn  { font-size: 12px; color: rgba(255,255,255,0.4); letter-spacing: 0.08em; text-transform: uppercase; }
.puzzle-hint  { font-size: 13px; color: #fbbf24; font-style: italic; padding: 6px 14px; background: rgba(251,191,36,0.08); border-radius: 8px; border: 1px solid rgba(251,191,36,0.2); }

/* board */
.board-wrap {
  width: min(480px, 88vw);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0,0,0,0.6);
}

/* feedback */
.feedback { padding: 10px 28px; border-radius: 999px; font-size: 15px; font-weight: 700; }
.feedback.correct { background: rgba(34,197,94,0.14); border: 1px solid rgba(34,197,94,0.38); color: #4ade80; }
.feedback.wrong   { background: rgba(239,68,68,0.12);  border: 1px solid rgba(239,68,68,0.32);  color: #f87171; }

/* controls */
.controls { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
.ctrl-btn {
  padding: 9px 22px; border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.13);
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.65);
  font-size: 13px; font-weight: 700; letter-spacing: 0.05em;
  cursor: pointer; transition: all 0.18s;
}
.ctrl-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
.ctrl-btn.next {
  background: color-mix(in srgb, v-bind(accent) 16%, transparent);
  border-color: color-mix(in srgb, v-bind(accent) 48%, transparent);
  color: v-bind(accent);
}

/* completed */
.completed { padding: 14px 28px; border-radius: 12px; background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.28); color: #4ade80; font-size: 18px; font-weight: 700; }

/* transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.28s; }
.fade-enter-from,  .fade-leave-to      { opacity: 0; }

@media (max-width: 640px) {
  .board-wrap   { width: calc(100vw - 32px); }
  .level-btn    { width: 38px; height: 38px; font-size: 13px; }
  .puzzle-label { font-size: 15px; }
  .puzzle-hint  { font-size: 12px; }
  .ctrl-btn     { padding: 8px 16px; font-size: 12px; }
  .feedback     { font-size: 13px; padding: 8px 20px; }
}
</style>
