<template>
  <div class="my-news">
    <mu-appbar>
      <mu-icon-button icon="email" to="/message" slot="right" />
      <span class="my-news-title">个人中心</span>
    </mu-appbar>
  
 
    <!--<mobile-tear-sheet>-->
    <mu-list>
      <div class="my-information">
         <img :src="user_msg.avatar_url" alt="user">
            <span class="name">{{user_msg.loginname}}</span>
            <div class="timer">
                <span>积分：{{user_msg.score}}</span>
                <span>注册时间：{{user_msg.create_at | formatDate }}</span>
            </div>
      </div>
      <!--<mu-list-item title="Drafts">
        <mu-icon slot="left" value="drafts" />
      </mu-list-item>-->
      <mu-list-item title="Inbox" toggleNested :open="false">
        <mu-icon slot="left" value="inbox" />
        <mu-list-item slot="nested" title="Starred">
          <mu-icon slot="left" value="grade" />
        </mu-list-item>
      </mu-list-item>
      <mu-list-item title="Inbox" toggleNested :open="false">
        <mu-icon slot="left" value="inbox" />
        <mu-list-item slot="nested" title="Starred">
          <mu-icon slot="left" value="grade" />
        </mu-list-item>
      </mu-list-item>
      <mu-list-item title="Inbox" toggleNested :open="false">
        <mu-icon slot="left" value="inbox" />
        <mu-list-item slot="nested" title="Starred">
          <mu-icon slot="left" value="grade" />
        </mu-list-item>
      </mu-list-item>
    </mu-list>
    <!--</mobile-tear-sheet>-->
  
  
    <FooterNav></FooterNav>
  </div>
</template>

<script>
import axios from 'axios'
  import FooterNav from '../components/FooterNav.vue'
  // import mobileTearSheet from '../../../components/mobileTearSheet'
  export default {
    components: {
      FooterNav
      //  'mobile-tear-sheet': mobileTearSheet
    },
    data() {
      return {
         accesstoken: '',
            user: {},
            user_msg: {}
      }
    },
     created() {
        this.accesstoken = localStorage.getItem("accesstoken")
        this.getData()
    },
    methods: {
      handleTabChange(val) {
        this.activeTab = val
      }
    }
  
  }
</script>

<style scoped>
  .my-news {
    position: relative;
    margin-top: -5rem;
    ;
  }
  
  .my-content {
    position: relative;
    text-align: left;
  }
  
  .my-news-title {
    padding-left: 5rem;
  }
  .my-information{
    height: 5rem;
  }
  .my-information img{
  float:left;
  height: 4rem;
 width: 4rem;
 margin-left: 1rem;
  }
</style>
