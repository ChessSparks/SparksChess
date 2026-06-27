<template>
  <div>
  <LoadingScreen :show="loading" type="endgames" color="#A78BFA" title="Endgames" />
  <CategoryPage title="Endgames" icon="⏳" accent="#A78BFA">

    <template #train>
      <LevelSelector category="endgames" accent="#A78BFA" />
    </template>

    <template #videos>
      <ComingSoon />
    </template>

    <template #read>
      <div class="article">
        <h2>Mastering the Endgame</h2>
        <p>The endgame is where most games are truly decided. Players who understand endgame principles convert advantages that others squander and save positions that others resign.</p>

        <h3>Core Endgame Principles</h3>
        <div class="motif-grid">
          <div class="motif-card" v-for="m in principles" :key="m.name">
            <div class="motif-name">{{ m.name }}</div>
            <div class="motif-desc">{{ m.desc }}</div>
          </div>
        </div>

        <h3>Why Study Endgames First?</h3>
        <p>Many top coaches recommend beginners study endgames before openings. Understanding how to win with a king and pawn teaches you the value of piece activity, opposition, and key squares — skills that apply everywhere.</p>

        <blockquote>"To improve at chess you should in the first instance study the endgame." — José Raúl Capablanca</blockquote>
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
  name: 'EndgamesView',
  components: { CategoryPage, LevelSelector, ComingSoon, LoadingScreen },
  data() {
    return {
      loading: true,
      principles: [
        { name: 'King Activity',  desc: 'In the endgame the king is a powerful piece. Centralise it immediately.' },
        { name: 'Passed Pawns',   desc: 'A passed pawn is a criminal that should be kept under lock and key.' },
        { name: 'Opposition',     desc: 'When two kings face with one square between them, the player NOT to move holds the opposition.' },
        { name: 'Triangulation',  desc: 'A king manoeuvre that loses a tempo to gain the opposition.' },
        { name: 'Rook Behind',    desc: "Rooks belong behind passed pawns — yours to push them, opponent's to stop them." },
        { name: 'Zugzwang',       desc: 'A situation where any move worsens the position — the obligation to move is a burden.' },
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
.article h2 { font-size: 26px; font-weight: 800; color: #A78BFA; margin: 0 0 16px; }
.article h3 { font-size: 18px; font-weight: 700; color: #e0d0b0; margin: 28px 0 10px; }
.article p  { color: rgba(255,255,255,0.72); margin: 0 0 16px; }
.motif-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; margin: 16px 0 24px; }
.motif-card { background: rgba(167,139,250,0.07); border: 1px solid rgba(167,139,250,0.22); border-radius: 10px; padding: 14px 16px; }
.motif-name { font-weight: 700; color: #A78BFA; margin-bottom: 4px; }
.motif-desc { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.5; }
blockquote { border-left: 3px solid #A78BFA; margin: 24px 0 0; padding: 10px 20px; color: rgba(255,255,255,0.55); font-style: italic; font-size: 15px; }

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
