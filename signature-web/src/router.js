import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home'),
      hidden: true
    },
    {
      path: '/detail/:id',
      component: () => import('@/views/Detail')
    },
    {
      path: '*',
      component: () => import('@/views/404'),
    }
  ]
})
