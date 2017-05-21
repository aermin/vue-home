<template>
<div class="my-news">
  <mu-appbar title="发布帖子">
  </mu-appbar>
<!--<mu-tabs class="my-news-content" :value="activeTab" @change="handleTabChange">
  <mu-tab value="tab1" icon="visibility_off" title="未读消息"/>
  <mu-tab value="tab2" icon="visibility" title="已读消息"/>
</mu-tabs>-->
 <FooterNav></FooterNav>
</div>

</template>
<script>

import FooterNav from '../components/FooterNav.vue'
export default {
    components: {
        FooterNav
    },
  data () {
    return {
      activeTab: 'tab1'
    }
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
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
