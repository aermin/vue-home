<template>
    <div class="wrapper">
        <mu-appbar class="header" :title="data.title">
            <mu-icon-button @click="goback" icon="arrow_back" slot="left" />
            <mu-icon-menu icon="more_vert" slot="right">
                <mu-menu-item title="顶部" href="#content-tip" />
                <mu-menu-item title="评论区" href="#comments-main" />
                <mu-menu-item title="写评论" href="#comments-input" />
                <mu-menu-item title="返回首页" to="/vue-home/dist" />
            </mu-icon-menu>
        </mu-appbar>
          <div class="main">
        <!--标题-->
      
        <div id="content-tip">
            <span v-if="data.top">置顶</span>
            <span v-else-if="data.good">精华</span>
            <span v-else-if="data.tab === 'share'" :style="styleObj">分享</span>
            <span v-else-if="data.tab === 'ask'" :style="styleObj">问答</span>
            <span v-else-if="data.tab === 'job'" :style="styleObj">招聘</span>
            <strong>  {{data.title}}  </strong>
        </div>
    
        <!--内容相关-->
        <div class="content-about">
            <router-link :to="{path:'/vue-home/dist/people',query:{user:data.author.loginname}}" alt="user">
                <img class="content-author-pic" v-if="data.author" :src="data.author.avatar_url" />
            </router-link>
            <span>作者：{{data.author.loginname}}</span>
            <span>发表时间：{{data.create_at | formatDate}}</span><br>
            <span>最后回复：{{data.last_reply_at | formatDate}}</span>
            <span>浏览量：{{data.visit_count}}</span>
            
        </div>
        <!--收藏-->
       <div class="collect"> <mu-checkbox v-if="accesstoken" v-model="collect" :label="collectText" class="demo-checkbox" uncheckIcon="favorite_border" checkedIcon="favorite" /></div>
        <!--正文 -->
        
        <div class="content-text" v-html="data.content"></div>
        <!--评论区-->
        <ul id="comments-main">
            <li class="comments-num">{{data.replies.length}}条评论</li>
            <li v-for="(list,index) in data.replies" :key="list.id">
                <router-link :to="{path:'/vue-home/dist/people',query:{user:list.author.loginname}}" alt="user">
                    <img v-if="list.author" :src="list.author.avatar_url" />
                </router-link>
                <strong>{{list.author.loginname}}</strong>
                <!--点赞-->
                <span class="comments-peopele-ups">
                 <mu-icon  @click="good(index)" value="thumb_up" :size="16" color="#a9a9a9"  />{{list.ups.length}}
                      </span>
                <!--时间-->
                <span class="comments-peopele-time">{{list.create_at | formatDate}}</span><br>
                <!--回复评论-->
                <mu-icon @click="commentReply(index)" class="textsms" value="textsms" :size="16" color="#a9a9a9" />
                <p v-html="list.content"></p>
            </li>
    
        </ul>
        <!--评论-->
        <div id="comments-input">
            <mu-text-field hintText="这里输入评论内容" multiLine :rows="3" :rowsMax="6" /><br/>
            <mu-raised-button label="评论" class="demo-raised-button" primary/>
        </div>
        <mu-toast v-if="!accesstoken" message="点赞评论请先登录" />
          </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                accesstoken: '',
                user_id: '',
                data: {
                    author: {},
                    replies: {}
                },
                styleObj: {
                    backgroundColor: '#999'
                },
                collect: false,
                loginname: '',
                collectText: '收藏'
            }
        },
        created() {
            this.accesstoken = localStorage.getItem("accesstoken")
            this.user_id = localStorage.getItem("user_id")
            this.loginname = localStorage.getItem("loginname")
            this.getData()
            this.hasCollected()
        },
        watch: {
            collect: function(newVal) {
                if (newVal) {
                    this.collectOn()
                    this.collectText = '取消收藏'
                } else {
                    this.collectOff()
                    this.collectText = '收藏'
                }
            }
        },
        methods: {
            getData() {
                let id = this.$route.query.id
                let that = this
                axios.get("https://www.vue-js.com/api/v1/topic/" + id)
                    .then(function(response) {
                        that.data = response.data.data
                        // console.log(that.data)
                    })
            },
            goback() {
                this.$router.go(-1)
                // 后退一步记录，等同于 history.back()
            },
            //收藏帖子
            collectOn() {
                let that = this
                axios.post('https://www.vue-js.com/api/v1/topic/collect', {
                    accesstoken: that.accesstoken,
                    topic_id: that.data.id
                }).then(function(response) {
                    //  console.log(response.data)
                })
            },
            //取消收藏帖子
            collectOff() {
                let that = this
                axios.post('https://www.vue-js.com/api/v1/topic/de_collect', {
                    accesstoken: that.accesstoken,
                    topic_id: that.data.id
                }).then(function(response) {
                    //  console.log(response.data)
                })
            },
            hasCollected() {
                if (this.accesstoken) {
                    let that = this
                    axios.get('https://www.vue-js.com/api/v1/user/' + that.loginname)
                        .then(function(response) {
                            let collecting = response.data.data.collect_topics
                            //  console.log(collecting)
                            //此页面的id
                            let thisId = that.data.id
                            //判断是否被收藏来双向处理页面收藏图标字体的状态
                            collecting.find(function(item) {
                                if (item.id === thisId) {
                                    that.collectText = '收藏'
                                    that.collect = true
                                }
                            })
                        })
                }
    
            },
            //点赞
            good(index) {
                let that = this
                let replyId = that.data.replies[index].id
                axios.post('https://www.vue-js.com/api/v1/reply/' + replyId + '/ups', {
                        accesstoken: that.accesstoken
                    })
                    .then(function(response) {
                        // console.log(response.data)
                        that.getData()
                    })
            }
    
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/sass/_base.scss';
    .wrapper {
      @include wrapper;
        #content-tip {
            position: relative;
            padding: 2rem;
            @include border-btm;
            span {
                position: relative;
                background-color: $class-green;
                color: #fff;
                padding: 0.2rem;
                border-radius: 0.2rem;
                font-size: 1rem;
                bottom: 0.2rem;
            }
            strong {
                font-size: 1.8rem;
            }
        }
        .content-about {
            position: relative;
            height: 5rem;
            padding-bottom: 1rem;
            @include border-btm;
            font-size: 1.2rem;
            color: $gray;
            text-align: left;
            line-height: 2rem;
            span {
                position: relative;
                padding-left: 2rem;
                top: 0.5rem;
                left: 5rem;
            }
            .content-author-pic {
                position: absolute;
                left: 0.6rem;
                border-radius: 50%;
                width: 4rem;
                height: 4rem;
                cursor: pointer;
                top: 0.4rem;
            }
        }
        .demo-checkbox {
            font-size: 1.6rem;
            margin-top: 1.6rem;
            position: relative;
        }
        .collect{
            text-align:center;
        }
        .content-text {
            padding: 1rem;
        }
        #comments-main {
            border-top: 1rem solid #EFF2F7;
            @include border-btm;
            padding-bottom: 0.5rem;
            list-style-type: none;
            .comments-num {
                border-left: 0.3rem solid #fa8072;
                font-size: 1.6rem;
                padding: 0.4rem 0.6rem;
            }
            li {
                position: relative;
                margin: {
                    left: -1rem;
                    top: 1rem;
                    right: 1rem;
                }
                @include border-btm;
                img {
                    border-radius: 50%;
                    width: 4rem;
                    height: 4rem;
                    cursor: pointer;
                    top: 0.4rem;
                }
                strong {
                    position: relative;
                    font-size: 1.6rem;
                    bottom: 2.5rem;
                }
            }
            .comments-peopele-ups {
                float: right;
                color: $gray;
            }
            .comments-peopele-time {
                position: absolute;
                font-size: 1.2rem;
                line-height: 2.2rem;
            }
            .textsms {
                float: right;
                margin-right: 0.5rem;
            }
        }
        #comments-input {
            margin: 1rem;
        }
    }
</style>
