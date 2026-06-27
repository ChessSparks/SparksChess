<template>
  <nav class="navbar">
    <router-link to="/" class="logo">
      <span class="logo-icon">♚</span>
      <span class="logo-text">SparksChess</span>
    </router-link>
    <ul class="nav-links">
      <li><router-link to="/tactics">Tactics</router-link></li>
      <li><router-link to="/mates">Mates</router-link></li>
      <li><router-link to="/endgames">Endgames</router-link></li>
      <li><router-link to="/openings">Openings</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 48px;
  height: 64px;
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(232, 213, 163, 0.15);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.logo-icon {
  font-size: 26px;
  line-height: 1;
  color: #e8d5a3;
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  color: #e8d5a3;
  letter-spacing: 0.04em;
}

.nav-links {
  display: flex;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  display: block;
  padding: 8px 18px;
  color: #c9b98a;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #e8d5a3;
  background: rgba(232, 213, 163, 0.1);
}

.nav-links a.router-link-exact-active {
  color: #e8d5a3;
  background: rgba(232, 213, 163, 0.15);
  border-bottom: 2px solid #e8d5a3;
}

@media (max-width: 640px) {
  .navbar    { padding: 0 20px; }
  .nav-links { display: none; }
}

</style>
