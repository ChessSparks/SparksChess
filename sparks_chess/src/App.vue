<template>
  <NavBar v-if="$route.path !== '/'" />
  <router-view />
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: { NavBar },
}
</script>

<style>
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  overflow-x: hidden;
}

/* override vue3-chessboard landscape rule that squashes the board */
.main-wrap {
  width: unset !important;
  max-width: unset !important;
  margin-inline: unset !important;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  background: #0d0d0d;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>
