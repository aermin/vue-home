<template>
<div class="my-news">
  <mu-appbar title="发布帖子">
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
<style scoped>
.my-news{
 position:relative;
 margin-top:-5rem;;
}

</style>
