import { createRouter, createWebHashHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/tactics',  component: () => import('../views/Tactics.vue') },
  { path: '/mates',    component: () => import('../views/Mates.vue') },
  { path: '/endgames', component: () => import('../views/Endgames.vue') },
  { path: '/openings', component: () => import('../views/Openings.vue') },

  { path: '/mates/:level',    component: () => import('../views/TrainingLevel.vue'), meta: { category: 'mates',    accent: '#EF4444', title: 'Mates' } },
  { path: '/tactics/:level',  component: () => import('../views/TrainingLevel.vue'), meta: { category: 'tactics',  accent: '#F59E0B', title: 'Tactics' } },
  { path: '/endgames/:level', component: () => import('../views/TrainingLevel.vue'), meta: { category: 'endgames', accent: '#A78BFA', title: 'Endgames' } },
  { path: '/openings/:level', component: () => import('../views/TrainingLevel.vue'), meta: { category: 'openings', accent: '#22D3EE', title: 'Openings' } },

  { path: '/endless', component: () => import('../views/EndlessPuzzles.vue') },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
