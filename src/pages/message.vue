<template>
<div class="my-news">
  <mu-appbar title="我的消息">
    <!--<mu-icon-button icon="chevron_right" slot="left"/>-->
    <!--<mu-icon-menu icon="more_vert" slot="right">
      <mu-menu-item title="菜单 1"/>
      <mu-menu-item title="菜单 2"/>
      <mu-menu-item title="菜单 3"/>
      <mu-menu-item title="菜单 4"/>
      <mu-menu-item title="菜单 5"/>
    </mu-icon-menu>-->
  </mu-appbar>
<mu-tabs class="my-news-content" :value="activeTab" @change="handleTabChange">
  <mu-tab value="tab1" icon="visibility_off" title="未读消息"/>
  <mu-tab value="tab2" icon="visibility" title="已读消息"/>
</mu-tabs>
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
.my-news-content{
    height: 6.8rem;
}
</style>
