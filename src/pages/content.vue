<template>
    <div>
        <mu-appbar class="content-header" :title="data.title">
            <mu-icon-button @click="goback" icon="arrow_back" slot="left" />
            <mu-icon-menu  icon="more_vert" slot="right">
          <mu-menu-item title="顶部" href="#"/>
          <mu-menu-item title="评论区" href="#comments"/>
          <mu-menu-item title="菜单 3"/>
          <mu-menu-item title="菜单 4"/>
          <mu-menu-item title="菜单 5"/>
        </mu-icon-menu>
        </mu-appbar>
      
        <!--</ul>-->
        <!--标题-->
        <div class="content-tip">
            <span v-if="data.top">置顶</span>
            <span v-else-if="data.good">精华</span>
            <span v-else-if="data.tab === 'share'" :style="styleObj">分享</span>
            <span v-else-if="data.tab === 'ask'" :style="styleObj">问答</span>
            <span v-else-if="data.tab === 'job'" :style="styleObj">招聘</span>
            <strong>
             {{data.title}}
         </strong>
         <mu-checkbox v-if="accesstoken" v-model="collect" :label="collect_txt" class="demo-checkbox" uncheckIcon="favorite_border" checkedIcon="favorite"/> 
        </div>
          <!--内容相关-->
        <div class="content-about">
        <router-link
                    :to="{path:'/user',query:{user:data.author.loginname}}"
                    alt="user">
                    <img  class="content-author-pic" v-if="data.author" :src="data.author.avatar_url" />
                    </router-link>
        <!--<ul class="content-about" >-->
         <!--<div  class="content-author-text">-->
         <span>作者：{{data.author.loginname}}</span>
         <span>发表时间：{{data.create_at | formatDate}}</span><br>
         <span>最后回复：{{data.last_reply_at | formatDate}}</span>
         <span>浏览量：{{data.visit_count}}</span>
        <!--</div>-->
        </div>
        <!--正文 -->
        <div class="content-text" v-html="data.content"></div>
        <!--评论区-->
        <ul id="comments">

        </ul>
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
                collected: false,
                collect_txt: '收藏主题'
                // ,
                //      reply: '',
            }
        },
        created() {
    
            this.accesstoken = localStorage.getItem("accesstoken")
            this.user_id = localStorage.getItem("user_id")
            this.loginname = localStorage.getItem("loginname")
            this.getData()
        },
        watch: {
            collect: function(newVal) {
                if (newVal) {
                    this.on_collect()
                    this.collect_txt = '取消收藏'
                } else {
                    this.off_collect()
                    this.collect_txt = '收藏主题'
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
                        console.log(that.data)
                    })
            },
            goback() {
                this.$router.go(-1)
                //   history.back()
            }
        }
    }
</script>

<style scoped>
    .content-header {
        position: fixed;
        margin-top: -5rem;
        
    }
  .content-about{
       position: relative;
           height:6rem;
           border: 1px #c0c0c0 solid;
           font-size: 1.4rem;
             color: #808080 ;
             text-align: left;
             line-height: 2rem;
           
    }
   .content-about span{
       position: relative;
        padding-left: 2rem;
        top: 1rem;
        left: 5rem;
    }
    .content-author-pic{
        position: absolute;
        left: 0.6rem;
        border-radius: 50%;
        width: 5rem;
        height: 5rem;
        cursor:pointer;
         top: 0.4rem;
    }
    .content-tip {
        position: relative;
        padding: 3rem;
        text-align: left;
        border-bottom: 1px #EFF2F7 solid;
    }
    
    .content-tip span {
        position: relative;
        background-color: #369219;
        color: #fff;
        padding: 0.2rem;
        border-radius: 0.2rem;
        font-size: 1rem;
        bottom: 0.2rem;
       
    }
    
    .content-tip strong {
        font-size: 1.8rem;
    }

 .content-text{
     text-align: left;
     padding:1rem;
 }
</style>
