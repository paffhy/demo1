import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/swipetest',
      name: 'swipetest',
      component: () => import('@/testviews/SwipeTest.vue'),
    },
  ],
})

export default router
