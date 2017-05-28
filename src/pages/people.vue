<template>
  <div class="my-news">
    <mu-appbar>
     <mu-icon-button @click="goback" icon="arrow_back" slot="left" />
      <mu-icon-button icon="email" to="/vue-home/dist/message" slot="right" />
      <span class="my-news-title">个人中心</span>
    </mu-appbar>
    <mu-list>
      <div class="my-information">
        <img :src="peopleUsg.avatar_url" alt="user">
        <div class="timer">
          <span class="name"><b>{{peopleUsg.loginname}}</b></span><br>
          <span>积分：{{peopleUsg.score}}</span><br>
          <span>注册时间：{{peopleUsg.create_at | formatDate }}</span>
        </div>
      </div>
  
      <mu-list-item class="my-information-firstitem list-item" title="最近的话题" v-if="peopleUsg.recent_topics" toggleNested :open="false">
        <mu-icon slot="left" value="chat" />
        <mu-list-item class="list-item-content" :to="{path:'/vue-home/dist/content',query:{id:item.id}}" v-for="item in peopleUsg.recent_topics" :key="item.id" slot="nested" title="Starred" :title="item.title">
          <mu-icon slot="left" value="hdr_weak" />
        </mu-list-item>
        <span class="msg-num">{{peopleUsg.recent_topics.length}}</span>
      </mu-list-item>
      <mu-list-item class="list-item" v-if="peopleUsg.recent_replies" title="最近的回复" toggleNested :open="false">
        <mu-icon slot="left" value="public" />
        <mu-list-item class="list-item-content" :to="{path:'/vue-home/dist/content',query:{id:item.id}}" v-for="item in peopleUsg.recent_replies" :key="item.id" slot="nested" title="Starred" :title="item.title">
          <mu-icon slot="left" value="hdr_weak" />
        </mu-list-item>
        <span class="msg-num">{{peopleUsg.recent_replies.length}}</span>
      </mu-list-item>
      <mu-list-item class="list-item" v-if="peopleUsg.collect_topics" title="收藏的话题" toggleNested :open="false">
        <mu-icon slot="left" value="star" />
        <mu-list-item class="list-item-content" :to="{path:'/vue-home/dist/content',query:{id:item.id}}" v-for="item in peopleUsg.collect_topics" :key="item.id" slot="nested" title="Starred" :title="item.title" :afterText="item.last_reply_at| formatDate">
          <!--<span class="topic-updata">话题更新：{{item.last_reply_at| formatDate }}</span>-->
          <mu-icon slot="left" value="hdr_weak" />
        </mu-list-item>
        <span class="msg-num">{{peopleUsg.collect_topics.length}}</span>
      </mu-list-item>
    </mu-list>
<!--
    <FooterNav></FooterNav>-->
  </div>
</template>

<script>
  import axios from 'axios'
//   import FooterNav from '../components/FooterNav.vue'
  export default {
    data() {
      return {
        accesstoken: '',
        user: {},
        peopleUsg: {}
      }
    },
    created() {
      this.accesstoken = localStorage.getItem("accesstoken")
      // alert(this.accesstoken)
      this.getData()
      // this.oldGetData()
    },
    methods: {
      getData() {
        let that = this
        let author_name = this.$route.query.user
         let url = 'https://www.vue-js.com/api/v1/user/' + author_name
        axios.get(url).then(function(response) {
            that.peopleUsg = response.data.data
             console.log(that.peopleUsg)
          })
      },
      goback() {
                this.$router.go(-1)
                // 后退一步记录，等同于 history.back()
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
    padding-left: 1rem;
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
  
  .list-item-content {
    position: relative;
    border: 0.1rem solid #EFF2F7;
    margin: 0.6rem;
  }
  
  .topic-updata {
    float: right;
    background-color: #f5f5f5;
    border-radius: .1rem;
    margin-top: 2rem;
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
  
  .msg-num {
    background-color: #f5f5f5;
    font-size: .2rem block;
    padding: 0 0.6rem;
    border-radius: 100%;
    position: absolute;
    right: 4rem;
    top: 1.2rem;
  }
  
  .list-item mu-list-item {
    color: red;
    background-color: red;
  }
  
  .demo-raised-button {
    margin-top: 2rem;
  }
</style>
