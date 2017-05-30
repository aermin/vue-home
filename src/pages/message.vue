<template>
  <div class="wrapper">
    <!--我的消息  这个页面其实就是数据的拉取了 没啥功能-->
    <mu-appbar class="header" title="我的消息">
    </mu-appbar>
    <div class="main">
    <div class="content" v-if="accesstoken">
      <!--未读信息-->
      <mu-list-item class="list-item" title="未读消息" v-if="readMsg.hasnot_read_messages" toggleNested :open="false">
        <mu-icon slot="left" value="visibility_off" />
        <mu-list-item class="list-item-content" :to="{path:'/vue-home/dist/content',query:{id:item.topic.id}}" v-for="item in readMsg.hasnot_read_messages" :key="item.id" slot="nested" :title="item.title">
  
        </mu-list-item>
        <span class="msg-num">{{readMsg.hasnot_read_messages.length}}</span>
      </mu-list-item>
      <!--已读消息-->
      <mu-list-item class="list-item" v-if="readMsg.has_read_messages" title="已读消息" toggleNested :open="false">
        <mu-icon slot="left" value="visibility" />
        <mu-list-item class="list-item-content" :to="{path:'/vue-home/dist/content',query:{id:item.topic.id}}" v-for="item in readMsg.has_read_messages" :key="item.id" slot="nested" :title="item.title">
          <span>来自<strong>{{item.author.loginname}}</strong></span>
          <span class="message-time">{{item.reply.create_at| formatDate}}</span><br>
          <p class="message-content">{{item.reply.content}}</p>
          <span class="message-title">帖子：《{{item.topic.title}}》</span>
          <span class="message-ups">获{{item.reply.ups.length}}个赞</span>
        </mu-list-item>
        <span class="msg-num">{{readMsg.has_read_messages.length}}</span>
      </mu-list-item>
    </div>
    <div v-if="!accesstoken" class="message-tip">
      <mu-raised-button to="/vue-home/dist/login" label="请先登录" class="demo-raised-button" primary/>
    </div>
    <FooterNav></FooterNav>
    </div>
  </div>
</template>

<script>
  import FooterNav from '../components/FooterNav.vue'
  import axios from 'axios'
  export default {
    components: {
      FooterNav
    },
    data() {
      return {
        accesstoken: '',
        user: {},
        readMsg: {}
      }
    },
    created() {
      this.accesstoken = localStorage.getItem("accesstoken")
      this.getData()
    },
    methods: {
      getData() {
        let that = this
        axios.get("https://www.vue-js.com/api/v1/messages?accesstoken=" + that.accesstoken)
          .then(function(response) {
            that.readMsg = response.data.data
            // console.log(that.readMsg)
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/sass/_base.scss';
  .wrapper {
    @include wrapper;
    .content {
      margin: 1rem 0 3rem 0;
      .list-item {
        text-align: left;
        margin-top: 1rem;
        .list-item-content {
          position: relative;
          border-bottom: 0.6rem solid #EFF2F7;
          margin: 0.6rem;
          .message-time {
            float: right;
          }
          .message-ups {
            float: right;
          }
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
        mu-list-item {
          color: red;
          background-color: red;
        }
      }
    }
  }
  
  .message-tip {
    text-align: center;
    font-size: 2.0rem;
    line-height: 100vh;
  }
</style>
