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

body {
  margin: 0;
  padding: 0;
  background: #0d0d0d;
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}
</style>
