import { createRouter, createWebHashHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/tactics', component: () => import('../views/Tactics.vue') },
  { path: '/mates', component: () => import('../views/Mates.vue') },
  { path: '/endgames', component: () => import('../views/Endgames.vue') },
  { path: '/openings', component: () => import('../views/Openings.vue') },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
