<template>
<div class="my-news">
  <mu-appbar title="更多">
  </mu-appbar>
<mu-appbar title="Title">
  <!--<mu-icon-button icon="menu" slot="left"/>-->
  <!--<mu-flat-button label="expand_more" slot="right"/>-->
  <mu-list-item  disabled>
    <mu-avatar slot="left" src=""/>
  </mu-list-item>
  <mu-flat-button to="/" label="立即登录" slot="right"/>
  <!--<mu-icon-button icon="expand_more" slot="right"/>-->
     <mu-icon-button icon="chevron_right" slot="right"/>
</mu-appbar>

  <mu-list>
      <mu-list-item  class="my-content"  title="VUE2.0" href="http://doc.vue-js.com/">
      <mu-icon slot="left" value="loyalty" />
    </mu-list-item>
    <mu-list-item  class="my-content"  title="参考资料" href="https://www.vue-js.com/getstart">
      <mu-icon slot="left" value="loyalty" />
    </mu-list-item>
    <mu-list-item  class="my-content"  title="关于" href="https://www.vue-js.com/about">
      <mu-icon slot="left" value="loyalty" />
    </mu-list-item>
    <mu-list-item  class="my-content"  title="给个star" href="">
      <mu-icon slot="left" value="star"  />
    </mu-list-item>
  </mu-list>
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
.my-content{
    position:relative;
    text-align: left;
}
</style>
