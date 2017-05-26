<template>
<mu-paper class="bottomNav">
  <mu-bottom-nav :value="bottomNav" @change="handleChange">
    <mu-bottom-nav-item value="首页" title="首页" icon="home" to="/"/>
    <mu-bottom-nav-item value="发布" title="发布" icon="open_in_browser" to="/publish"/>
    <mu-bottom-nav-item value="我的" title="我的" icon="perm_identity"  :to="person_path"/>
     <mu-bottom-nav-item value="更多" title="更多" icon="chat"  to="/more"/>
       <mu-bottom-nav-item value="测试" title="测试" icon="chat"  to="/content"/>
  </mu-bottom-nav>
</mu-paper>
</template>

<script>
export default {
  data () {
    return {
      bottomNav: 'recents'
    }
  },
  created() {
            this.facthData()
        },
        watch: {
            '$route': 'facthData'
        },
  methods: {
    handleChange (val) {
      this.bottomNav = val
    },
    facthData() {
                let accesstoken = localStorage.getItem("accesstoken")
                if (accesstoken) {
                    this.person_path = '/my'
                } else {
                    // this.person_path = '/login'
                     this.person_path= '/login'
            
                }
                if (this.$route.path === '/') {
                    this.bottomNav = '首页'
                }
                if (this.$route.path === '/publish') {
                    this.bottomNav = '发布'
                }
                if (this.$route.path === '/login' || this.$route.path === '/my') {
                    this.bottomNav = '我的'
                }
                if (this.$route.path === '/more') {
                    this.bottomNav = '更多'
                }
            }
  }
}
</script>
<style>
.bottomNav{
    position:fixed;
    bottom:0rem;
    left:0;
    right:0;
 
}
.bottomNav .mu-bottom-nav-shift-wrapper {
    display: flex;
    justify-content: space-around;
}
</style>