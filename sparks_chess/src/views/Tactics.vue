<template>
  <div>
  <LoadingScreen :show="loading" type="tactics" color="#F59E0B" title="Tactics" />
  <CategoryPage title="Tactics" icon="⚡" accent="#F59E0B">

    <template #train>
      <LevelSelector category="tactics" accent="#F59E0B" />
    </template>

    <template #videos>
      <ComingSoon />
    </template>

    <template #read>
      <div class="article">
        <h2>What are Chess Tactics?</h2>
        <p>Tactics are short sequences of moves that result in a tangible gain — winning material, checkmating the opponent, or reaching a better position. Unlike strategy, which unfolds over many moves, tactics are concrete and calculable.</p>

        <h3>The Building Blocks</h3>
        <p>Every tactical pattern is built from a handful of core motifs. Learning to spot them is the single fastest way to improve your chess rating.</p>

        <div class="motif-grid">
          <div class="motif-card" v-for="m in motifs" :key="m.name">
            <div class="motif-name">{{ m.name }}</div>
            <div class="motif-desc">{{ m.desc }}</div>
          </div>
        </div>

        <h3>How to Study Tactics</h3>
        <p>The most effective method is solving puzzles daily. Start with simple one-move combinations and progress to multi-move sequences. Always try to calculate the full line before moving.</p>

        <blockquote>"Chess tactics flow from superior pieces." — Bobby Fischer</blockquote>
      </div>
    </template>

  </CategoryPage>
  </div>
</template>

<script>
import CategoryPage  from '../components/CategoryPage.vue'
import LevelSelector from '../components/LevelSelector.vue'
import ComingSoon    from '../components/ComingSoon.vue'
import LoadingScreen from '../components/LoadingScreen.vue'

export default {
  name: 'TacticsView',
  components: { CategoryPage, LevelSelector, ComingSoon, LoadingScreen },
  data() {
    return {
      loading: true,
      motifs: [
        { name: 'Fork',        desc: 'One piece attacks two enemy pieces simultaneously.' },
        { name: 'Pin',         desc: 'A piece is immobilised because moving it exposes a more valuable piece.' },
        { name: 'Skewer',      desc: 'The more valuable piece is forced to move, exposing the piece behind it.' },
        { name: 'Discovery',   desc: 'Moving one piece reveals an attack by a piece behind it.' },
        { name: 'Deflection',  desc: 'Forcing a defending piece away from its critical duty.' },
        { name: 'Zwischenzug', desc: 'An in-between move that changes the evaluation before the expected sequence.' },
      ],
    }
  },
  mounted() {
    setTimeout(() => { this.loading = false }, 3000)
  },
}
</script>

<style scoped>
.article { max-width: 720px; line-height: 1.75; }
.article h2 { font-size: 26px; font-weight: 800; color: #F59E0B; margin: 0 0 16px; }
.article h3 { font-size: 18px; font-weight: 700; color: #e0d0b0; margin: 28px 0 10px; }
.article p  { color: rgba(255,255,255,0.72); margin: 0 0 16px; }
.motif-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; margin: 16px 0 24px; }
.motif-card { background: rgba(245,158,11,0.07); border: 1px solid rgba(245,158,11,0.22); border-radius: 10px; padding: 14px 16px; }
.motif-name { font-weight: 700; color: #F59E0B; margin-bottom: 4px; }
.motif-desc { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.5; }
blockquote { border-left: 3px solid #F59E0B; margin: 24px 0 0; padding: 10px 20px; color: rgba(255,255,255,0.55); font-style: italic; font-size: 15px; }

@media (max-width: 640px) {
  .article h2  { font-size: 20px; }
  .article h3  { font-size: 16px; }
  .motif-grid  { grid-template-columns: repeat(2, 1fr); }
  .motif-card  { padding: 12px; }
  .motif-name  { font-size: 13px; }
  .motif-desc  { font-size: 11px; }
  blockquote   { font-size: 13px; padding: 8px 14px; }
}
</style>
