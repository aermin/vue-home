<template>
<mu-tabs :value="activeTab" @change="handleTabChange">
  <mu-tab value="tab1" to="/" icon="phone" title="首页"/>
  <mu-tab value="tab2" to="/publish" icon="favorite" title="发布"/>
  <mu-tab value="tab3"  to="/message" icon="person_pin" title="消息"/>
   <mu-tab value="tab4" icon="person_pin" title="我的"/>
</mu-tabs>
</template>

<script>
export default {
  data () {
    return {
    //   activeTab: 'tab1'
        bottomNav: '首页',
       person_path: '/login',
    }
  },
  methods: {
    handleTabChange (val) {
      this.activeTab = val
    }
  }
}
</script>