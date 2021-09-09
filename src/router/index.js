import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        //0
        path: '/',
        name: 'Buy',
        component: () => import(/* webpackChunkName: "login" */ '../views/buyCars.vue')
      },
      {
        //1
        path: '/sellcars',
        name: 'sellcars',
        component: () => import(/* webpackChunkName: "login" */ '../views/sellCars.vue')
      },
      {
        //2
        path: '/carInfo',
        name: 'CarInfo',
        component: () => import(/* webpackChunkName: "login" */ '../views/carInfo.vue')
      },
      {
        //3
        path: '/person',
        name: 'Person',
        component: () => import(/* webpackChunkName: "login" */ '../views/person.vue'),
        children:[
          {
            path: '/perInfo',
            name: 'personInfo',
            component: () => import(/* webpackChunkName: "login" */ '../views/personInfo.vue')
          },
          {
            path: '/changePerInfo',
            name: 'changePerInfo',
            component: () => import(/* webpackChunkName: "login" */ '../views/changePerInfo.vue')
          },
          {
            path: '/changePassword',
            name: 'changePassword',
            component: () => import(/* webpackChunkName: "login" */ '../views/changePassword.vue')
          },
          {
            path: '/buyCarInfo',
            name: 'buyCarInfo',
            component: () => import(/* webpackChunkName: "login" */ '../views/buyCarInfo.vue')
          },
          {
            path: '/sellCarInfo',
            name: 'sellCarInfo',
            component: () => import(/* webpackChunkName: "login" */ '../views/sellCarInfo.vue')
          },
        ]
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  },
  {
    path: '/reg',
    name: 'Register',
    component: () => import(/* webpackChunkName: "login" */ '../views/register.vue')
  },
  {
    path: '/set',
    name: 'SetPassword',
    component: () => import(/* webpackChunkName: "login" */ '../views/setPassword.vue')
  },
  {
    path: '/reset',
    name: 'Retrieve',
    component: () => import(/* webpackChunkName: "login" */ '../views/retrieve.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
