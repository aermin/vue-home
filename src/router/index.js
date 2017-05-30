import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import index from '../pages/index'
import message from '../pages/message'
import my from '../pages/my'
import publish from '../pages/publish'
import login from '../pages/login'
import more from '../pages/more'
import content from '../pages/content'
import people from '../pages/people'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/vue-home/dist',
      name: 'index',
      component: index
    }, 
    {
      path: '/vue-home/dist/message',
      name: 'message',
      component: message
    },
    {
      path: '/vue-home/dist/my',
      name: 'my',
      component: my
    },
    {
      path: '/vue-home/dist/publish',
      name: 'publish',
      component: publish
    },
     {
      path: '/vue-home/dist/login',
      name: 'login',
      component: login
    },
    {
      path: '/vue-home/dist/more',
      name: 'more',
      component: more
    },
    {
      path: '/vue-home/dist/content',
      name: 'content',
      component: content
    },
     {
      path: '/vue-home/dist/people',
      name: 'people',
      component: people
    }
  ]
})
