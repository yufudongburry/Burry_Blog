import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/Home/index.vue'),
  },
  {
    path: '/share',
    component: () => import('@/views/Share/index.vue'),
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
