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
      //  meta: {
      //       requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      //   },
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
    },
    {
      path: '/more',
      name: 'more',
      component: more
    },
    {
      path: '/content',
      name: 'content',
      component: content
    },
     {
      path: '/people',
      name: 'people',
      component: people
    }
  ]
})
