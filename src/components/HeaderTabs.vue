<template>
  <div class="demo-infinite-container HeaderTabs"  >
    <mu-tabs class="tabs" :value="activeTab" @change="handleTabChange">
      <mu-tab value="all" title="全部" />
      <mu-tab value="good" title="精华" />
      <mu-tab value="weex" title="weex" />
      <mu-tab value="share" title="分享" />
      <mu-tab value="ask" title="问答" />
      <mu-tab value="job" title="招聘" />
    </mu-tabs>
    <mu-list class="tabs-content">
      <template v-for="(item,index) in items">
       <section class="list">
                      <!-- <img @click="user(index)" :src="item.author.avatar_url" alt=""> -->
                      <router-link
                      :to="{path:'/user',query:{user:item.author.loginname}}"
                      :src="item.author.avatar_url" 
                      tag="img"
                      alt="user"></router-link>
                      <router-link :to="{path:'/content',query:{id:item.id}}" tag="div" class="content">
                          <div class="list_title">
                              <span v-if="item.top">置顶</span>
                              <span v-else-if="item.good">精华</span>
                              <span v-else-if="item.tab === 'share'" :style="styleObj">分享</span>
                              <span v-else-if="item.tab === 'ask'" :style="styleObj">问答</span>
                              <span v-else-if="item.tab === 'job'" :style="styleObj">招聘</span>
                              <strong>{{item.title}}</strong>
                          </div>
                        
                          <div class="timer">
                              <span> <mu-icon value="chat" :size="14"/>{{item.reply_count}} &nbsp <mu-icon value="visibility" :size="14"/>{{item.visit_count}}</span>
                              <span>{{item.last_reply_at | formatDate }}</span>
                          </div>
                      </router-link>
                  </section>
      </template>
     <p class="nomore" v-show="nomore">内容到底啦</p>
  </mu-list>
 <section v-if="!items.length">
            暂无话题
        </section>
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
</div>

</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
         loading: false,
            scroller: null,
            nomore: false,
            activeTab: 'all', //当前选中tab项
            items: [],
            styleObj: {
          backgroundColor: '#C5C5C7'
        },
       url:'https://www.vue-js.com/api/v1/topics?tab=all',
        page: 1
      }
    },
      created() {
        this.getData()
    },
     mounted() {
        this.scroller = this.$el
    },
    methods: {
        handleTabChange(val) {
            this.page = 1 //切换tab，页数重置为第一页
            this.nomore = false //切换tab，重置
            this.activeTab = val
            this.url = 'https://www.vue-js.com/api/v1/topics?tab=' + val
            this.getData()
        },
            getData() {
            let that = this
                // let url = 'http://www.vue-js.com/api/v1/topics?tab=all'
                // let url = this.url + '&page=' + this.num
            axios.get(this.url).then(function(response) {
                that.items = response.data.data
                    // console.log(that.items)
            })
      },   
   loadMore() {
            if (!this.nomore) {
                this.loading = true
                this.page +=1
                let url =  'https://www.vue-js.com/api/v1/topics?tab=all' + '&page=' + this.page
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

<style scoped>
.HeaderTabs{
     overflow: auto;
    /*border: 1px solid #d9d9d9;*/
}
 .tabs {
   margin-top: 4rem;
    height: 4rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    /*border-top: 1px solid rgba(255,255,255,.1);*/
    display: flex;
    justify-content: space-around;
  }
  
  .mu-tab-link,
  .mu-tab-active {
    white-space: nowrap;
  }
  .tabs-content{
    /*margin-top: 2rem;*/
  }
  .list {
    display: flex;
    border-bottom: 1px solid #999;
    padding: 1rem;
  }
  
  .list>img {
    width: 3rem;
    height: 3rem;
    /*border-radius: 50%;*/
    margin-right: 1rem;
  }
  
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .list_title {
    /*display: flex;*/
    text-align: left;
  }
  
  .list_title>span {
    /*white-space:nowrap;*/
    background-color: #369219;
    color: #fff;
    padding: 0.2rem;
    border-radius: 0.2rem;
     font-size: 1rem;
     margin-right:0.5rem;
     
  }
  
  .list_title strong {
    font-size: 1.4rem;
    
  }
  
  .timer {
    display: flex;
    justify-content: space-between;
    color: #999;
    padding-top: 1rem;
  }

  .nomore {
    text-align: center;
    padding: 1rem 0;
  }
</style>
