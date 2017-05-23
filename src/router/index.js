import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import index from '../pages/index'
import message from '../pages/message'
import my from '../pages/my'
import publish from '../pages/publish'
import login from '../pages/login'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    }, 
    {
      path: '/message',
      name: 'message',
      component: message
    },
    {
      path: '/my',
      name: 'my',
      component: my
    },
    {
      path: '/publish',
      name: 'publish',
      component: publish
    },
     {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
