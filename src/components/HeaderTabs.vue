<template>
    <div class="demo-infinite-container main">
        <!-- tabs -->
        <mu-tabs class="tabs" :value="activeTab" @change="handleTabChange">
            <mu-tab value="all" title="全部" />
            <mu-tab value="good" title="精华" />
            <mu-tab value="weex" title="weex" />
            <mu-tab value="share" title="分享" />
            <mu-tab value="ask" title="问答" />
            <mu-tab value="job" title="招聘" />
        </mu-tabs>
        <!-- 帖子列表 -->
        <mu-list>
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
                            <h3>{{item.title}}</h3>
                        </div>
                      
                        <div class="timer">
                            <span>{{item.reply_count}} / {{item.visit_count}}</span>
                            <span>{{item.last_reply_at }}</span>
                        </div>
                    </router-link>
                </section>
            </template>
            <p class="nomore" v-show="nomore">没有更多了。。。</p>
        </mu-list>
        <section v-if="!items.length">
            暂无话题
        </section>
        <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" />
    </div>
</template>
<script>
import axios from 'axios'
// import timeago from 'timeago.js'
export default {
    data() {
        return {
            loading: false,
            scroller: null,
            nomore: false,
            activeTab: 'all', //当前选中tab项
            items: [],
            styleObj: {
                backgroundColor: '#999'
            },
            url: 'https://www.vue-js.com/api/v1/topics?tab=all',
            page: 1
        }
    },
    created() {
        this.getData()
    },
    mounted() {
        this.scroller = this.$el
    },
        filters: {
        timeago(val) {
            let time = new Date(val)
            var thistime = timeago()
            return thistime.format(time, 'zh_CN') //将UTC时间转换格式---> 几天前,几小时前...
        }
    },
    methods: {
        loadMore() {
            if (!this.nomore) {
                this.loading = true
                this.page +=1
                let url = this.url + '&page=' + this.page
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
        },
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
        }
    }
}
</script>
<style scoped>
.main {
    overflow: auto;
    border: 1px solid #d9d9d9;
}

.tab .tabs {
    margin-top: 5rem;
    height: 4rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    border-top: 1px solid rgba(255,255,255,.1);
    display: flex;
    justify-content: space-around;
}
.mu-tab-link,.mu-tab-active{
    white-space: nowrap;
}
.list {
    display: flex;
    border-bottom: 1px solid #999;
    padding: 1rem;
}

.list>img {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
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
}

.list_title>span {
    /*white-space:nowrap;*/
    background-color: #009688;
    color: #fff;
    padding: 0.2rem;
    border-radius: 0.2rem;
}

.list_title>h3 {
    display: inline;
    font-weight: 700;
}

.timer {
    display: flex;
    justify-content: space-between;
    color: #999;
}

.nomore {
    text-align: center;
    padding: 1rem 0;
}
</style>
