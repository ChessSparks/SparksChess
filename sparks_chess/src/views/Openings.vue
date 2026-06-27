<template>
  <div>
  <LoadingScreen :show="loading" type="openings" color="#22D3EE" title="Openings" />
  <CategoryPage title="Openings" icon="📖" accent="#22D3EE">

    <template #train>
      <LevelSelector category="openings" accent="#22D3EE" />
    </template>

    <template #videos>
      <ComingSoon />
    </template>

    <template #read>
      <div class="article">
        <h2>Building Your Opening Repertoire</h2>
        <p>Openings set the stage for everything that follows. You don't need to memorise hundreds of lines — you need to understand the principles behind each move so you can find the right idea even when you leave theory.</p>

        <h3>The Three Opening Principles</h3>
        <div class="motif-grid">
          <div class="motif-card" v-for="m in principles" :key="m.name">
            <div class="motif-name">{{ m.name }}</div>
            <div class="motif-desc">{{ m.desc }}</div>
          </div>
        </div>

        <h3>Choosing Your Openings</h3>
        <p>Pick openings that match your style. Tactical players enjoy the Sicilian or King's Indian. Positional players prefer the London or Queen's Gambit. Beginners do well starting with 1.e4 or 1.d4 and learning the ideas before memorising variations.</p>

        <blockquote>"A good player is always lucky." — José Raúl Capablanca</blockquote>
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
  name: 'OpeningsView',
  components: { CategoryPage, LevelSelector, ComingSoon, LoadingScreen },
  data() {
    return {
      loading: true,
      principles: [
        { name: 'Control the Centre', desc: 'Place pawns and pieces where they control e4, e5, d4, d5.' },
        { name: 'Develop Pieces',     desc: 'Get your knights and bishops out before doing anything else.' },
        { name: 'Castle Early',       desc: 'King safety is paramount — castle within the first 10 moves.' },
        { name: "Don't Move Twice",   desc: 'Moving the same piece twice in the opening loses time (tempo).' },
        { name: 'Connect Rooks',      desc: 'Once castled and developed, connect your rooks on the back rank.' },
        { name: 'No Early Queen',     desc: 'The queen can be chased by lesser pieces, losing precious tempo.' },
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
.article h2 { font-size: 26px; font-weight: 800; color: #22D3EE; margin: 0 0 16px; }
.article h3 { font-size: 18px; font-weight: 700; color: #e0d0b0; margin: 28px 0 10px; }
.article p  { color: rgba(255,255,255,0.72); margin: 0 0 16px; }
.motif-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; margin: 16px 0 24px; }
.motif-card { background: rgba(34,211,238,0.06); border: 1px solid rgba(34,211,238,0.2); border-radius: 10px; padding: 14px 16px; }
.motif-name { font-weight: 700; color: #22D3EE; margin-bottom: 4px; }
.motif-desc { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.5; }
blockquote { border-left: 3px solid #22D3EE; margin: 24px 0 0; padding: 10px 20px; color: rgba(255,255,255,0.55); font-style: italic; font-size: 15px; }

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
