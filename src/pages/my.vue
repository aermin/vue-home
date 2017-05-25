<template>
  <div class="my-news">
    <mu-appbar>
      <mu-icon-button icon="email" to="/message" slot="right" />
      <span class="my-news-title">个人中心</span>
    </mu-appbar>
    <mu-list>
      <div class="my-information">
        <img :src="user_msg.avatar_url" alt="user">
        <div class="timer">
          <span class="name"><b>{{user_msg.loginname}}</b></span><br>
          <span>积分：{{user_msg.score}}</span><br>
          <span>注册时间：{{user_msg.create_at | formatDate }}</span>
        </div>
      </div>
  
      <mu-list-item class="my-information-firstitem list-item" title="最近的话题" v-if="user_msg.recent_topics" toggleNested :open="false">
        <mu-icon slot="left" value="chat" />
        <mu-list-item :to="{path:'/content',query:{id:item.id}}" v-for="item in user_msg.recent_topics" :key="item.id" slot="nested" title="Starred">
          <mu-icon slot="left" value="grade" />
        </mu-list-item>
      </mu-list-item>
      <mu-list-item class="list-item" title="最近的回复" toggleNested :open="false">
        <mu-icon slot="left" value="public" />
        <mu-list-item slot="nested" title="Starred">
          <mu-icon slot="left" value="grade" />
        </mu-list-item>
      </mu-list-item>
      <mu-list-item class="list-item" title="收藏的话题" toggleNested :open="false">
        <mu-icon slot="left" value="star" />
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
  export default {
    components: {
      FooterNav
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
      getData() {
        let that = this
        axios.post('https://www.vue-js.com/api/v1/accesstoken', {
            accesstoken: that.accesstoken
          })
          .then(function(response) {
            that.user = response.data
            that.getUserData()
          })
      },
      getUserData() {
        let that = this
        axios.get("https://www.vue-js.com/api/v1/user/" + that.user.loginname)
          .then(function(response) {
            that.user_msg = response.data.data
          })
      }
    }
  
  }
</script>

<style scoped>
  .my-news {
    position: relative;
    margin-top: -5rem;
  }
  
  .my-content {
    position: relative;
    text-align: left;
  }
  
  .my-news-title {
    padding-left: 5rem;
  }
  
  .my-information {
    height: 5rem;
    padding-top: 1rem;
  }
  
  .my-information img {
    float: left;
    height: 5rem;
    width: 5rem;
    margin-left: 1rem;
  }
  
  .name {
    font-size: 1.6rem;
  }
  
  .timer {
    text-align: left;
    padding: 0.2rem 0 0 8rem;
    font-size: 1.2rem;
  }
  
  .my-information-firstitem {
    margin-top: 2rem;
  }
  
  .list-item {
    text-align: left;
  }
</style>
