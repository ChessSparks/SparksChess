<template>
  <CategoryPage title="Mates" icon="🎯" accent="#EF4444">

    <template #train>
      <TrainingBoard :puzzles="puzzles" accent="#EF4444" />
    </template>

    <template #videos>
      <VideoGrid :videos="videos" />
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
</template>

<script>
import CategoryPage  from '../components/CategoryPage.vue'
import TrainingBoard from '../components/TrainingBoard.vue'
import VideoGrid     from '../components/VideoGrid.vue'

export default {
  name: 'MatesView',
  components: { CategoryPage, TrainingBoard, VideoGrid },
  data() {
    return {
      videos: [
        { id: 'dQw4w9WgXcQ', title: 'Back Rank Checkmate — The Most Common Blunder',  duration: '10:12' },
        { id: 'dQw4w9WgXcQ', title: 'Smothered Mate Step by Step',                     duration: '08:55' },
        { id: 'dQw4w9WgXcQ', title: 'Anastasia\'s Mate Explained',                     duration: '11:30' },
        { id: 'dQw4w9WgXcQ', title: 'Scholar\'s Mate & How to Defend Against It',      duration: '07:44' },
      ],
      patterns: [
        { name: 'Back Rank Mate',   desc: 'Rook or queen delivers mate on the opponent\'s first rank when the king is trapped behind pawns.' },
        { name: 'Smothered Mate',   desc: 'A knight mates a king that is surrounded (smothered) by its own pieces.' },
        { name: 'Anastasia\'s Mate',desc: 'Knight and rook combine to trap the king against the edge of the board.' },
        { name: 'Arabian Mate',     desc: 'Knight covers the escape square while a rook delivers check on the edge.' },
        { name: 'Epaulette Mate',   desc: 'The king is flanked by its own pieces, leaving only a queen check.' },
        { name: 'Légal\'s Mate',    desc: 'Queen sacrifice followed by two knights and a bishop delivering mate.' },
      ],
      puzzles: [
        { label: 'Back Rank Mate',    hint: 'Rook to the 8th rank!',                    turn: 'w', fen: '6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1',                     solution: ['d1','d8'] },
        { label: 'Smothered Mate',    hint: 'The knight jumps to f7 giving check.',      turn: 'w', fen: '6rk/6pp/7N/8/8/8/6PP/6K1 w - - 0 1',                       solution: ['h6','f7'] },
        { label: 'Scholar\'s Mate',   hint: 'Queen to f7 is checkmate!',                 turn: 'w', fen: 'rnbqkbnr/pppp1ppp/8/4p3/2B1P3/8/PPPP1PPP/RNBQK1NR w KQkq - 2 3', solution: ['d1','h5'] },
        { label: 'Arabian Mate',      hint: 'The rook seals the rank, knight covers g8.',turn: 'w', fen: '5rk1/6pp/7N/8/8/8/6PP/6K1 w - - 0 1',                      solution: ['h6','f7'] },
        { label: 'Queen & Rook Mate', hint: 'Queen checks, cutting off escape squares.', turn: 'w', fen: '7k/8/8/8/8/8/6QR/6K1 w - - 0 1',                            solution: ['g2','g7'] },
        { label: 'Two Rooks Mate',    hint: 'Roll the rooks — first rook to h1.',        turn: 'w', fen: '7k/8/8/8/8/8/8/R1R3K1 w - - 0 1',                           solution: ['c1','h1'] },
        { label: 'Epaulette Mate',    hint: 'The queen slides to e7, the king can\'t escape.',  turn: 'w', fen: '3rk2r/4pppp/8/8/8/8/4PPPP/3RK2R w Kk - 0 1',        solution: ['d1','d8'] },
        { label: 'Rook Mate',         hint: 'Rook to g8 is checkmate.',                  turn: 'w', fen: '6k1/6pp/8/8/8/8/6PP/R5K1 w - - 0 1',                        solution: ['a1','a8'] },
        { label: 'Bishop & Knight',   hint: 'Bishop covers f8, queen mates on h7.',      turn: 'w', fen: '5rk1/5pBp/8/8/8/8/5PPP/6K1 w - - 0 1',                     solution: ['g7','f8'] },
        { label: 'Queen Mate',        hint: 'Queen to h7 is the final blow.',             turn: 'w', fen: '6k1/5ppp/8/8/8/8/5PPP/6KQ w - - 0 1',                      solution: ['h1','h7'] },
      ],
    }
  },
}
</script>

<style scoped>
.article { max-width: 720px; line-height: 1.75; }
.article h2 { font-size: 26px; font-weight: 800; color: #EF4444; margin: 0 0 16px; }
.article h3 { font-size: 18px; font-weight: 700; color: #e0d0b0; margin: 28px 0 10px; }
.article p  { color: rgba(255,255,255,0.72); margin: 0 0 16px; }

.motif-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  margin: 16px 0 24px;
}

.motif-card {
  background: rgba(239,68,68,0.07);
  border: 1px solid rgba(239,68,68,0.22);
  border-radius: 10px;
  padding: 14px 16px;
}

.motif-name { font-weight: 700; color: #EF4444; margin-bottom: 4px; }
.motif-desc { font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.5; }

blockquote {
  border-left: 3px solid #EF4444;
  margin: 24px 0 0;
  padding: 10px 20px;
  color: rgba(255,255,255,0.55);
  font-style: italic;
  font-size: 15px;
}
</style>
