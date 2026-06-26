<template>
  <CategoryPage title="Tactics" icon="⚡" accent="#F59E0B">

    <template #train>
      <TrainingBoard :puzzles="puzzles" accent="#F59E0B" />
    </template>

    <template #videos>
      <VideoGrid :videos="videos" />
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
</template>

<script>
import CategoryPage  from '../components/CategoryPage.vue'
import TrainingBoard from '../components/TrainingBoard.vue'
import VideoGrid     from '../components/VideoGrid.vue'

export default {
  name: 'TacticsView',
  components: { CategoryPage, TrainingBoard, VideoGrid },
  data() {
    return {
      videos: [
        { id: 'dQw4w9WgXcQ', title: 'Top 10 Tactical Patterns Every Player Must Know', duration: '12:34' },
        { id: 'dQw4w9WgXcQ', title: 'How to Calculate Tactics Like a Grandmaster',       duration: '18:22' },
        { id: 'dQw4w9WgXcQ', title: 'Fork, Pin & Skewer — Master These Three First',     duration: '09:47' },
        { id: 'dQw4w9WgXcQ', title: 'Discovered Attack Explained with Examples',          duration: '14:05' },
      ],
      motifs: [
        { name: 'Fork',    desc: 'One piece attacks two enemy pieces simultaneously.' },
        { name: 'Pin',     desc: 'A piece is immobilised because moving it exposes a more valuable piece.' },
        { name: 'Skewer',  desc: 'The reverse of a pin — the more valuable piece is forced to move, exposing the piece behind it.' },
        { name: 'Discovery', desc: 'Moving one piece reveals an attack by another.' },
        { name: 'Deflection', desc: 'Forcing a defending piece away from its duty.' },
        { name: 'Zwischenzug', desc: 'An in-between move that changes the evaluation before the expected sequence.' },
      ],
      puzzles: [
        { label: 'Knight Fork',      hint: 'The knight can attack the king and queen at once.',     turn: 'w', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',         solution: ['f3','g5'] },
        { label: 'Pin the Queen',    hint: 'Line up your bishop with the queen and king.',           turn: 'w', fen: 'rnb1kbnr/pppp1ppp/8/4p3/2B1P3/8/PPPP1PPP/RNBQK1NR w KQkq - 2 3',             solution: ['c4','f7'] },
        { label: 'Back Rank Mate',   hint: 'The queen delivers a crushing blow on the 8th rank.',    turn: 'w', fen: '6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1',                                      solution: ['d1','d8'] },
        { label: 'Skewer the King',  hint: 'Force the king to move, winning the rook behind it.',    turn: 'w', fen: '4k3/8/8/8/8/8/8/R3K3 w Q - 0 1',                                              solution: ['a1','a8'] },
        { label: 'Double Check',     hint: 'Move the knight to give check from two pieces.',          turn: 'w', fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 4',   solution: ['f3','e5'] },
        { label: 'Discovered Attack',hint: 'Move the pawn to uncover the bishop\'s attack.',          turn: 'w', fen: 'r1bqkbnr/ppp2ppp/2np4/4p3/2BPP3/5N2/PPP2PPP/RNBQK2R w KQkq - 0 5',         solution: ['d4','e5'] },
        { label: 'Queen Sacrifice',  hint: 'Sacrifice your queen to set up a smothered mate.',        turn: 'w', fen: 'r5rk/5p1p/5PpB/2p5/p3P3/2N5/PP1Q2qP/K2R3R w - - 0 1',                      solution: ['d2','g2'] },
        { label: 'Deflection',       hint: 'Force the rook away from defending the back rank.',       turn: 'w', fen: '5rk1/5pp1/7p/8/8/8/5PPP/3Q1RK1 w - - 0 1',                                   solution: ['d1','d8'] },
        { label: 'Zwischenzug',      hint: 'Before recapturing, find the in-between check!',          turn: 'w', fen: 'r1bqkb1r/ppp2ppp/2np1n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',    solution: ['f3','g5'] },
        { label: 'Smothered Mate',   hint: 'The knight delivers the final check — the king is trapped by its own pieces.', turn: 'w', fen: '6rk/6pp/7N/8/8/8/6PP/6K1 w - - 0 1',               solution: ['h6','f7'] },
      ],
    }
  },
}
</script>

<style scoped>
.article { max-width: 720px; line-height: 1.75; }
.article h2 { font-size: 26px; font-weight: 800; color: #F59E0B; margin: 0 0 16px; }
.article h3 { font-size: 18px; font-weight: 700; color: #e0d0b0; margin: 28px 0 10px; }
.article p  { color: rgba(255,255,255,0.72); margin: 0 0 16px; }

.motif-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  margin: 16px 0 24px;
}

.motif-card {
  background: rgba(245,158,11,0.07);
  border: 1px solid rgba(245,158,11,0.22);
  border-radius: 10px;
  padding: 14px 16px;
}

.motif-name { font-weight: 700; color: #F59E0B; margin-bottom: 4px; }
.motif-desc { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.5; }

blockquote {
  border-left: 3px solid #F59E0B;
  margin: 24px 0 0;
  padding: 10px 20px;
  color: rgba(255,255,255,0.55);
  font-style: italic;
  font-size: 15px;
}
</style>
