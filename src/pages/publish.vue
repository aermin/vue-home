<template>
<div class="wrapper">
  <mu-appbar title="发布帖子" class="header">
    <mu-icon-button @click="goback" icon="arrow_back" slot="left" />
  </mu-appbar>

</div>

</template>
<script>
export default {
  data () {
    return {
      activeTab: 'tab1'
    }
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
    },
      goback() {
        this.$router.go(-1)
        // 后退一步记录，等同于 history.back()
      }
    
  }
}
</script>
<style lang="scss" scoped>
    @import '../assets/sass/_base.scss';
    .wrapper {
      @include wrapper;
    }
</style>
