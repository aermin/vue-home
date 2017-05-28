<template>
<div class="wrapper">
  <mu-appbar title="发布帖子" class="header">
    <mu-icon-button @click="goback" icon="arrow_back" slot="left" />
  </mu-appbar>
  <div class="main">
 <mu-select-field class="choose" v-model="game" label="请选择板块" :errorText="errorText">
    <mu-menu-item value="1" title="分享"/>
    <mu-menu-item value="2" title="回答"/>
    <mu-menu-item value="3" title="招聘"/>
  </mu-select-field>
</div>
</div>

</template>
<script>
export default {
  data () {
    const list = []
    for (let i = 0; i < 30; i++) {
      list.push(`item ${i + 1}`)
    }
    return {
      activeTab: 'tab1',
        list,
      game: ''
    }
  },
   computed: {
    errorText () {
      return this.game ? '' : '这是必选项'
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
      .choose{
        margin: {
        top: 6rem;
        }
      }
    }
</style>
