<template>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">

    <!-- Tactics: lightning bolt -->
    <template v-if="name === 'tactics'">
      <path d="M13 2L3 14h8L9 22l12-12h-8z" fill="currentColor" stroke="none"/>
    </template>

    <!-- Mates: crosshair / target -->
    <template v-else-if="name === 'mates'">
      <circle cx="12" cy="12" r="9"/>
      <circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none"/>
      <line x1="12" y1="2"  x2="12" y2="6"/>
      <line x1="12" y1="18" x2="12" y2="22"/>
      <line x1="2"  y1="12" x2="6"  y2="12"/>
      <line x1="18" y1="12" x2="22" y2="12"/>
    </template>

    <!-- Endgames: hourglass -->
    <template v-else-if="name === 'endgames'">
      <line x1="5" y1="2"  x2="19" y2="2"/>
      <line x1="5" y1="22" x2="19" y2="22"/>
      <path d="M17 22v-4.17a2 2 0 0 0-.59-1.42L12 12l-4.41 4.41A2 2 0 0 0 7 17.83V22"/>
      <path d="M7 2v4.17a2 2 0 0 0 .59 1.42L12 12l4.41-4.41A2 2 0 0 0 17 6.17V2"/>
    </template>

    <!-- Openings: open book -->
    <template v-else-if="name === 'openings'">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </template>

  </svg>
</template>

<script>
export default {
  name: 'NavIcon',
  props: { name: { type: String, required: true } },
}
</script>
