<template>
  <CategoryPage title="Endgames" icon="⏳" accent="#A78BFA">

    <template #train>
      <TrainingBoard :puzzles="puzzles" accent="#A78BFA" />
    </template>

    <template #videos>
      <VideoGrid :videos="videos" />
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
</template>

<script>
import CategoryPage  from '../components/CategoryPage.vue'
import TrainingBoard from '../components/TrainingBoard.vue'
import VideoGrid     from '../components/VideoGrid.vue'

export default {
  name: 'EndgamesView',
  components: { CategoryPage, TrainingBoard, VideoGrid },
  data() {
    return {
      videos: [
        { id: 'dQw4w9WgXcQ', title: 'King & Pawn Endgame — The Opposition Explained',  duration: '14:20' },
        { id: 'dQw4w9WgXcQ', title: 'Rook Endgames — Lucena & Philidor Positions',      duration: '21:08' },
        { id: 'dQw4w9WgXcQ', title: 'Queen vs Pawn — When Can the Pawn Survive?',      duration: '11:55' },
        { id: 'dQw4w9WgXcQ', title: 'Bishop & Knight Endgames Simplified',              duration: '16:33' },
      ],
      principles: [
        { name: 'King Activity',   desc: 'In the endgame, the king is a powerful piece. Centralise it immediately.' },
        { name: 'Passed Pawns',    desc: 'A passed pawn is a criminal that should be kept under lock and key.' },
        { name: 'Opposition',      desc: 'When two kings face each other with one square between them, the player who does NOT have to move has the opposition.' },
        { name: 'Triangulation',   desc: 'A king manoeuvre that loses a tempo to gain the opposition.' },
        { name: 'Rook Behind',     desc: 'Rooks belong behind passed pawns — yours to push them, opponent\'s to stop them.' },
        { name: 'Zugzwang',        desc: 'A situation where any move worsens the position — the obligation to move is a burden.' },
      ],
      puzzles: [
        { label: 'King & Pawn Win',      hint: 'Push the king forward first.',                 turn: 'w', fen: '8/8/8/4k3/8/4K3/4P3/8 w - - 0 1',                             solution: ['e3','e4'] },
        { label: 'Opposition',           hint: 'Take the opposition with the king.',            turn: 'w', fen: '8/8/8/3k4/8/8/8/3K4 w - - 0 1',                              solution: ['d1','d2'] },
        { label: 'Queen the Pawn',       hint: 'Advance the pawn to promote.',                 turn: 'w', fen: '8/P7/8/8/8/8/8/k1K5 w - - 0 1',                               solution: ['a7','a8'] },
        { label: 'Lucena Position',      hint: 'Build the bridge — rook to e4.',              turn: 'w', fen: '1K6/1P6/8/8/4r3/8/8/2k1R3 w - - 0 1',                          solution: ['e1','e4'] },
        { label: 'Philidor Defense',     hint: 'Cut the king off with the rook on the 6th.',  turn: 'b', fen: '8/8/8/1k6/8/8/1K6/R7 b - - 0 1',                              solution: ['b5','b6'] },
        { label: 'Passed Pawn Race',     hint: 'King rushes to promote first.',               turn: 'w', fen: '8/8/2k5/8/8/2K5/8/1P6 w - - 0 1',                              solution: ['c3','d4'] },
        { label: 'Zugzwang',             hint: 'You have the opposition — advance your king.', turn: 'w', fen: '8/8/3k4/8/3K4/8/8/8 w - - 0 1',                               solution: ['d4','d5'] },
        { label: 'Triangulation',        hint: 'Lose a tempo to gain the opposition.',         turn: 'w', fen: '8/8/8/3k4/8/2K5/8/8 w - - 0 1',                               solution: ['c3','c4'] },
        { label: 'Rook Behind Pawn',     hint: 'Rook goes behind the passer.',                turn: 'w', fen: '8/8/8/3P4/8/8/8/R2K1k2 w - - 0 1',                             solution: ['a1','d1'] },
        { label: 'Bishop vs Knight',     hint: 'King centralises — the key to this endgame.', turn: 'w', fen: '8/8/8/3k4/5n2/8/8/3KB3 w - - 0 1',                             solution: ['d1','e2'] },
      ],
    }
  },
}
</script>

<style scoped>
.article { max-width: 720px; line-height: 1.75; }
.article h2 { font-size: 26px; font-weight: 800; color: #A78BFA; margin: 0 0 16px; }
.article h3 { font-size: 18px; font-weight: 700; color: #e0d0b0; margin: 28px 0 10px; }
.article p  { color: rgba(255,255,255,0.72); margin: 0 0 16px; }

.motif-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  margin: 16px 0 24px;
}

.motif-card {
  background: rgba(167,139,250,0.07);
  border: 1px solid rgba(167,139,250,0.22);
  border-radius: 10px;
  padding: 14px 16px;
}

.motif-name { font-weight: 700; color: #A78BFA; margin-bottom: 4px; }
.motif-desc { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.5; }

blockquote {
  border-left: 3px solid #A78BFA;
  margin: 24px 0 0;
  padding: 10px 20px;
  color: rgba(255,255,255,0.55);
  font-style: italic;
  font-size: 15px;
}
</style>
