import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/Home/index.vue'),
  },
  {
    path: '/essays',
    component: () => import('@/views/Essays/index.vue'),
  },
  {
    path: '/share',
    component: () => import('@/views/Share/index.vue'),
  },
  {
    path: '/web',
    component: () => import('@/views/Web/index.vue'),
  },
  {
    path: '/game',
    component: () => import('@/views/Share/components/game.vue'),
  },
  {
    path: '/music',
    component: () => import('@/views/Music/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 挂载函数
export function setupRouter(app:App<Element>):void {
  app.use(router)
}

export default router
