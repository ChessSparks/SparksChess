<template>
  <div>
  <LoadingScreen :show="loading" type="mates" color="#EF4444" title="Mates" />
  <CategoryPage title="Mates" icon="🎯" accent="#EF4444">

    <template #train>
      <LevelSelector category="mates" accent="#EF4444" />
    </template>

    <template #videos>
      <ComingSoon />
    </template>

    <template #read>
      <div class="article">
        <h2>Checkmating Patterns</h2>
        <p>A checkmate ends the game immediately. Recognising checkmating patterns lets you deliver the final blow quickly and confidently, saving time and energy in critical moments.</p>

        <h3>Essential Mate Patterns</h3>
        <div class="motif-grid">
          <div class="motif-card" v-for="m in patterns" :key="m.name">
            <div class="motif-name">{{ m.name }}</div>
            <div class="motif-desc">{{ m.desc }}</div>
          </div>
        </div>

        <h3>The Concept of Mating Nets</h3>
        <p>A mating net is a position where the opponent's king cannot escape no matter where it goes. Learning to build a net systematically is more reliable than hunting for a single brilliant move.</p>

        <blockquote>"The pin is mightier than the sword." — Fred Reinfeld</blockquote>
      </div>
    </template>

  </CategoryPage>
  </div>
</template>

<script>
import CategoryPage   from '../components/CategoryPage.vue'
import LevelSelector  from '../components/LevelSelector.vue'
import ComingSoon     from '../components/ComingSoon.vue'
import LoadingScreen  from '../components/LoadingScreen.vue'

export default {
  name: 'MatesView',
  components: { CategoryPage, LevelSelector, ComingSoon, LoadingScreen },
  data() {
    return {
      loading: true,
      patterns: [
        { name: 'Back Rank Mate',  desc: 'Rook or queen delivers mate on the first rank when the king is trapped behind its own pawns.' },
        { name: 'Smothered Mate',  desc: 'A knight mates a king that is surrounded (smothered) by its own pieces.' },
        { name: "Scholar's Mate",  desc: 'A four-move checkmate using queen and bishop targeting the f7 weakness.' },
        { name: 'Arabian Mate',    desc: 'Knight covers the escape square while a rook delivers check on the edge.' },
        { name: 'Epaulette Mate',  desc: 'The king is flanked by its own pieces, leaving only a queen check available.' },
        { name: "Légal's Mate",    desc: 'Queen sacrifice followed by two knights and a bishop delivering mate.' },
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
.article h2 { font-size: 26px; font-weight: 800; color: #EF4444; margin: 0 0 16px; }
.article h3 { font-size: 18px; font-weight: 700; color: #e0d0b0; margin: 28px 0 10px; }
.article p  { color: rgba(255,255,255,0.72); margin: 0 0 16px; }
.motif-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; margin: 16px 0 24px; }
.motif-card { background: rgba(239,68,68,0.07); border: 1px solid rgba(239,68,68,0.22); border-radius: 10px; padding: 14px 16px; }
.motif-name { font-weight: 700; color: #EF4444; margin-bottom: 4px; }
.motif-desc { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.5; }
blockquote { border-left: 3px solid #EF4444; margin: 24px 0 0; padding: 10px 20px; color: rgba(255,255,255,0.55); font-style: italic; font-size: 15px; }

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
