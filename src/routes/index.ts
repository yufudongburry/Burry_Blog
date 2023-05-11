import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: {
      isHeader: true
    },
    component: () => import('@/views/Home/index.vue'),
  },
  {
    path: '/blog',
    meta: {
      isHeader: false
    },
    component: () => import('@/views/Regular/index.vue'),
  },
  {
    path: '/music',
    meta: {
      isHeader: false
    },
    component: () => import('@/views/Echarts/index.vue'),
  }
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
