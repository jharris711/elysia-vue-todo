import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import TodoView from '@/views/TodoView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    
    { path: '/todos/:id', name: 'todoDetail', component: TodoView},
    { path: '/todos', redirect: '/'},
  ],
})

export default router
