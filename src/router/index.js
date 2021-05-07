import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'


const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  },
  {
    path: '/reg',
    name: 'Register',
    component: () => import(/* webpackChunkName: "login" */ '../views/register.vue')
  },
  {
    path: '/setPassword',
    name: 'SetPassword',
    component: () => import(/* webpackChunkName: "login" */ '../views/setPassword.vue')
  },
  {
    path: '/ret',
    name: 'Retrieve',
    component: () => import(/* webpackChunkName: "login" */ '../views/retrieve.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
