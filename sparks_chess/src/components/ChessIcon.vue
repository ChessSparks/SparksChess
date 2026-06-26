<template>
  <svg :viewBox="vb" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <!-- Tactics: lightning bolt -->
    <template v-if="name === 'tactics'">
      <path d="M21 3 L9 20 h7 L14 29 L26 12 h-7 Z" transform="scale(0.55) translate(3,3)"/>
    </template>

    <!-- Mates: king -->
    <template v-else-if="name === 'mates'">
      <rect x="10.5" y="2"   width="3"  height="9"  rx="1"/>
      <rect x="7"    y="5"   width="10" height="3"  rx="1"/>
      <path d="M7.5 11 C5.5 11 4 14 4 17 v7 h16 v-7 c0-3-1.5-6-3.5-6 z"/>
      <rect x="3"    y="25"  width="18" height="4"  rx="2"/>
    </template>

    <!-- Endgames: pawn -->
    <template v-else-if="name === 'endgames'">
      <circle cx="12" cy="7.5" r="4.5"/>
      <path d="M8.5 12 C6.5 12 5 15 5 18 v6 h14 v-6 c0-3-1.5-6-3.5-6 C14.5 13.5 13 15 12 15 C11 15 9.5 13.5 8.5 12 Z"/>
      <rect x="4"    y="25"  width="16" height="4"  rx="2"/>
    </template>

    <!-- Openings: rook -->
    <template v-else-if="name === 'openings'">
      <rect x="4"  y="3"  width="4" height="6" rx="1"/>
      <rect x="10" y="3"  width="4" height="6" rx="1"/>
      <rect x="16" y="3"  width="4" height="6" rx="1"/>
      <path d="M5 9 h14 l-1.5 15 H6.5 Z"/>
      <rect x="3"  y="25" width="18" height="4" rx="2"/>
    </template>
  </svg>
</template>

<script>
export default {
  name: 'ChessIcon',
  props: {
    name: { type: String, required: true },
  },
  data() {
    return { vb: '0 0 24 32' }
  },
}
</script>
