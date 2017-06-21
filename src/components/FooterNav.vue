<template>
<!--底部导航-->
  <mu-paper class="bottomNav">
    <mu-bottom-nav :value="bottomNav" @change="handleChange">
      <mu-bottom-nav-item value="首页" title="首页" icon="home" to="/vue-home/dist" />
      <mu-bottom-nav-item value="信息" title="信息" icon="email" to="/vue-home/dist/message" />
      <mu-bottom-nav-item value="我的" title="我的" icon="person" :to="person_path" />
      <mu-bottom-nav-item value="更多" title="更多" icon="more" to="/vue-home/dist/more" />
      <!--<mu-bottom-nav-item value="测试" title="测试" icon="chat" to="/people" />-->
    </mu-bottom-nav>
  </mu-paper>
</template>

<script>
  export default {
    data() {
      return {
        bottomNav: 'recents'
      }
    },
    created() {
      this.facthData()
    },
    // $route:路由信息对象，属性是响应式的，可以使用一个 watcher去响应路由的改变
    watch: {
      '$route': 'facthData'
    },
    methods: {
      handleChange(val) {
        this.bottomNav = val
      },
      facthData() {
        let accesstoken = localStorage.getItem("accesstoken")
        if (accesstoken) {
          this.person_path = '/vue-home/dist/my'
        } else {
          this.person_path = '/vue-home/dist/login'
        }
        if (this.$route.path === '/vue-home/dist') {
          this.bottomNav = '首页'
        }
        if (this.$route.path === '/vue-home/dist/message') {
          this.bottomNav = '信息'
        }
        if (this.$route.path === '/vue-home/dist/login' || this.$route.path === '/vue-home/dist/my') {
          this.bottomNav = '我的'
        }
        if (this.$route.path === '/vue-home/dist/more') {
          this.bottomNav = '更多'
        }
      }
    }
  }
</script>

<style>
  .bottomNav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  
  .bottomNav .mu-bottom-nav-shift-wrapper {
    display: flex;
    justify-content: space-around;
  }
</style>