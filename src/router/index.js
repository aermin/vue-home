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
      path: '/vue-home',
      name: 'index',
      component: index
    }, 
    {
      path: '/vue-home/message',
      name: 'message',
      component: message
    },
    {
      path: '/vue-home/my',
      name: 'my',
      //  meta: {
      //       requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      //   },
      component: my
    },
    {
      path: '/vue-home/publish',
      name: 'publish',
      component: publish
    },
     {
      path: '/vue-home/login',
      name: 'login',
      component: login
    },
    {
      path: '/vue-home/more',
      name: 'more',
      component: more
    },
    {
      path: '/vue-home/content',
      name: 'content',
      component: content
    },
     {
      path: '/vue-home/people',
      name: 'people',
      component: people
    }
  ]
})
