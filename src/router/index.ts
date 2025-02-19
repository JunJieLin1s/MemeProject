import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import MemeList from '@/views/MemeList.vue'
import MemeCreator from '@/views/MemeCreator.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/memes', name: 'MemeList', component: MemeList },
  { path: '/create', name: 'MemeCreator', component: MemeCreator },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
