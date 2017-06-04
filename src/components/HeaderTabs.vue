<template>
  <!--顶部tabs-->
  <div class="demo-infinite-container HeaderTabs">
    <mu-tabs class="tabs" :value="activeTab" @change="handleTabChange">
      <mu-tab value="all" title="全部" />
      <mu-tab value="good" title="精华" />
      <mu-tab value="weex" title="weex" />
      <mu-tab value="share" title="分享" />
      <mu-tab value="ask" title="问答" />
      <mu-tab value="job" title="招聘" />
    </mu-tabs>
    <div class="inloading" v-if="inloading">
      Loading...
    </div>

    <!--列表展示-->
    <mu-list>
      <div v-for="(item,index) in items">
        <div class="list">
          <!--:to 实现点击头像进入该用户 ，:src+tag="img"实现item的头像展示；-->
          <router-link :to="{path:'/vue-home/dist/people',query:{user:item.author.loginname}}" :src="item.author.avatar_url" tag="img" alt="user"></router-link>
          <!--同理实现点击进入帖子内容,以及判断显示置顶，精华等标签-->
          <router-link :to="{path:'/vue-home/dist/content',query:{id:item.id}}" tag="div" class="content">
            <div class="list-title">
              <span v-if="item.top">置顶</span>
              <span v-else-if="item.good">精华</span>
              <span v-else-if="item.tab === 'share'" :style="styleObj">分享</span>
              <span v-else-if="item.tab === 'ask'" :style="styleObj">问答</span>
              <span v-else-if="item.tab === 'job'" :style="styleObj">招聘</span>
              <strong>{{item.title}}</strong>
            </div>
            <!--评论数和访问量和时间-->
            <div class="timer">
              <span> <mu-icon value="chat" :size="14"/>{{item.reply_count}} &nbsp <mu-icon value="visibility" :size="14"/>{{item.visit_count}}</span>
              <span>{{item.last_reply_at | formatDate }}</span>
            </div>
          </router-link>
        </div>
      </div>
      <!--若下拉加载没内容了 显示这个 -->
      <p class="nomore" v-show="nomore">内容到底啦</p>
    </mu-list>
    <!--若无item 显示这个  -->
    <div v-if="!items.length">
      <strong>暂无话题</strong>
    </div>
    <!--下拉加载更多的组件-->
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" />
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        loading: false,
        inloading: false,
        scroller: null,
        nomore: false,
        activeTab: 'all', //当前选中tab项
        items: [],
        styleObj: {
          backgroundColor: '#C5C5C7'
        },
        url: 'https://www.vue-js.com/api/v1/topics?tab=all',
        page: 1
      }
    },
    // 先导航和渲染组件，然后在组件的 created 钩子中获取数据
     // 组件创建完后获取数据，
    created() {
      this.getData()
    },
    // 挂载完毕
    mounted() {
      this.scroller = this.$el
    },
    methods: {
      // tab切换
      handleTabChange(val) {
        this.page = 1 //切换tab，页数重置为第一页
        this.nomore = false //切换tab，重置
        this.activeTab = val
        this.url = 'https://www.vue-js.com/api/v1/topics?tab=' + val
        this.getData()
      },
      // 数据获取
      getData() {
        let that = this
        that.inloading = true
        axios.get(this.url).then(function(response) {
          that.items = response.data.data
          that.inloading=false
          // console.log(that.items)
        })
      },
      // 下拉刷新
      loadMore() {
        if (!this.nomore&&!this.inloading) {
          this.loading = true
          this.page += 1
          let url = 'https://www.vue-js.com/api/v1/topics?tab=all' + '&page=' + this.page
          let arr = []
          setTimeout(() => {
            let that = this
            axios.get(url).then(function(response) {
              arr = response.data.data
              if (arr.length === 0) {
                that.loading = false
                that.nomore = true
                return
              }
              that.items = [...that.items, ...arr]
              arr = []
            })
            this.loading = false
          }, 1000)
        }
      }
    }
  
  }
</script>

<style scoped lang="scss">
  @import '../assets/sass/_base.scss';
  .HeaderTabs {
    overflow: auto;
    height: 100vh;
    .tabs {
      margin-top: 4rem;
      height: 4rem;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-around;
    }
  }
  
  .mu-tab-link,
  .mu-tab-active {
    white-space: nowrap;
  }
  
  .list {
    display: flex;
    border-bottom: 0.6rem solid #EFF2F7;
    padding: 1rem;
    >img {
      width: 3rem;
      height: 3rem;
      margin-right: 1rem;
    }
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .list-title {
        text-align: left;
        >span {
          background-color: #369219;
          color: #fff;
          padding: 0.2rem;
          border-radius: 0.2rem;
          font-size: 1rem;
          margin-right: 0.5rem;
        }
        strong {
          font-size: 1.4rem;
        }
      }
      .timer {
        display: flex;
        justify-content: space-between;
        color: $gray;
        padding-top: 1rem;
      }
    }
  }
  
  .nomore {
    text-align: center;
    padding: 1rem 0;
  }
</style>
