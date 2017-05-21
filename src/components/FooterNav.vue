<template>
<mu-paper class="bottomNav">
  <mu-bottom-nav :value="bottomNav" @change="handleChange">
    <mu-bottom-nav-item value="recents" title="首页" icon="home" to="/"/>
    <mu-bottom-nav-item value="favorites" title="发布" icon="open_in_browser" to="/publish"/>
    <mu-bottom-nav-item value="nearby" title="消息" icon="chat"  to="/message"/>
    <mu-bottom-nav-item value="tab4" title="我的" icon="perm_identity"  to="/login"/>
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
  methods: {
    handleChange (val) {
      this.bottomNav = val
    }
  }
}
</script>
<style lang="">
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