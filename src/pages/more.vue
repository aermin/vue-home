<template>
<div class="wrapper">
  <mu-appbar title="更多" class="header">
  </mu-appbar>
  <div class="main">
  <mu-list>
    <mu-list-item  class="my-content"  title="项目API" href="https://www.vue-js.com/api/">
      <mu-icon slot="left" value="loyalty" />
    </mu-list-item>
    <mu-list-item  class="my-content"  title="项目地址&给个star" href="https://github.com/Hxvin/vue-home">
      <mu-icon slot="left" value="star"  />
    </mu-list-item>
  </mu-list>
 <FooterNav></FooterNav>
  </div>
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
<style lang="scss" scoped>
  @import '../assets/sass/_base.scss';
     .wrapper {
      @include wrapper;
     }

.my-content{
    position:relative;
    text-align: left;
}
</style>
