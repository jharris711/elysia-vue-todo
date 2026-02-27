import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import TodoView from '@/views/TodoView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/todos', redirect: '/'},
    { path: '/todos/:id', component: TodoView},
  ],
})

export default router
