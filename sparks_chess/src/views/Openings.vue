<template>
  <CategoryPage title="Openings" icon="📖" accent="#22D3EE">

    <template #train>
      <TrainingBoard :puzzles="puzzles" accent="#22D3EE" />
    </template>

    <template #videos>
      <VideoGrid :videos="videos" />
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
</template>

<script>
import CategoryPage  from '../components/CategoryPage.vue'
import TrainingBoard from '../components/TrainingBoard.vue'
import VideoGrid     from '../components/VideoGrid.vue'

export default {
  name: 'OpeningsView',
  components: { CategoryPage, TrainingBoard, VideoGrid },
  data() {
    return {
      videos: [
        { id: 'dQw4w9WgXcQ', title: 'The Italian Game — Complete Guide for Beginners',  duration: '19:45' },
        { id: 'dQw4w9WgXcQ', title: 'Sicilian Defense — Why It\'s Black\'s Best Answer', duration: '22:10' },
        { id: 'dQw4w9WgXcQ', title: 'The London System — Simple & Solid for White',      duration: '17:30' },
        { id: 'dQw4w9WgXcQ', title: 'Queen\'s Gambit Explained Move by Move',            duration: '25:00' },
      ],
      principles: [
        { name: 'Control the Centre', desc: 'Place pawns and pieces where they control e4, e5, d4, d5.' },
        { name: 'Develop Pieces',     desc: 'Get your knights and bishops out before doing anything else.' },
        { name: 'Castle Early',       desc: 'King safety is paramount — castle within the first 10 moves.' },
        { name: 'Don\'t Move Twice',  desc: 'Moving the same piece twice in the opening loses time (tempo).' },
        { name: 'Connect Rooks',      desc: 'Once castled and developed, connect your rooks by clearing the back rank.' },
        { name: 'No Early Queen',     desc: 'The queen can be chased around by lesser pieces, losing precious tempo.' },
      ],
      puzzles: [
        { label: 'Italian Game Start',   hint: 'Knight to f3, develop and control e5.',        turn: 'w', fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1',           solution: ['g1','f3'] },
        { label: 'Control the Centre',   hint: 'Pawn to d4, fight for the centre.',             turn: 'w', fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',             solution: ['e2','e4'] },
        { label: 'Develop the Bishop',   hint: 'Bishop to c4, eyeing the f7 pawn.',             turn: 'w', fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',      solution: ['f1','c4'] },
        { label: 'Castle to Safety',     hint: 'Castle kingside now.',                           turn: 'w', fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 4 6', solution: ['e1','g1'] },
        { label: 'Queen\'s Gambit',      hint: 'Offer the c4 pawn to fight for the centre.',    turn: 'w', fen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 1',           solution: ['c2','c4'] },
        { label: 'Sicilian Defence',     hint: 'Black plays c5, contesting the centre.',        turn: 'b', fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1',           solution: ['c7','c5'] },
        { label: 'London System',        hint: 'Bishop to f4 completes the London setup.',      turn: 'w', fen: 'rnbqkbnr/pppppppp/8/8/3P4/2N5/PPP1PPPP/R1BQKBNR w KQkq - 2 2',         solution: ['c1','f4'] },
        { label: 'Knight Centre',        hint: 'Knight to c3 supports the centre pawns.',       turn: 'w', fen: 'rnbqkbnr/pppp1ppp/8/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 4',      solution: ['b1','c3'] },
        { label: 'Ruy Lopez',            hint: 'Bishop to b5, pinning the knight.',             turn: 'w', fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3',   solution: ['f1','b5'] },
        { label: 'King\'s Indian Setup', hint: 'Fianchetto the bishop to g7.',                  turn: 'b', fen: 'rnbqk1nr/ppppppbp/6p1/8/3PP3/2N5/PPP2PPP/R1BQKBNR b KQkq - 2 3',     solution: ['g7','f6'] },
      ],
    }
  },
}
</script>

<style scoped>
.article { max-width: 720px; line-height: 1.75; }
.article h2 { font-size: 26px; font-weight: 800; color: #22D3EE; margin: 0 0 16px; }
.article h3 { font-size: 18px; font-weight: 700; color: #e0d0b0; margin: 28px 0 10px; }
.article p  { color: rgba(255,255,255,0.72); margin: 0 0 16px; }

.motif-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  margin: 16px 0 24px;
}

.motif-card {
  background: rgba(34,211,238,0.06);
  border: 1px solid rgba(34,211,238,0.2);
  border-radius: 10px;
  padding: 14px 16px;
}

.motif-name { font-weight: 700; color: #22D3EE; margin-bottom: 4px; }
.motif-desc { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.5; }

blockquote {
  border-left: 3px solid #22D3EE;
  margin: 24px 0 0;
  padding: 10px 20px;
  color: rgba(255,255,255,0.55);
  font-style: italic;
  font-size: 15px;
}
</style>
