<template>
    <div class="login">
        <mu-appbar>
            <mu-icon-button icon="help_outline" href="https://www.vue-js.com/api/" slot="right" />
            <span class="my-news-title">登录</span>
        </mu-appbar>
        <div class="login-key">
            <mu-text-field label="请输入accessToken" hintText="accessToken" type="password" labelFloat/><br>
            <mu-raised-button label="登录" class="demo-raised-button" primary/>
        </div>
        <FooterNav></FooterNav>
    </div>
</template>
<script>
    import FooterNav from '../components/FooterNav.vue'
    export default {
        components: {
            FooterNav
        },
        data() {
            return {
                value: '默认文字'
            }
        },
        methods:{
            login(){
                let that = this
                axios.post('https://www.vue-js.com/api/v1/accesstoken',{
                    accesstoken:that.val
                })
                .then(function(response){
                 that.error=''
                //  使用localStorage API 
                        localStorage.setItem('accesstoken', that.val)
                        localStorage.setItem('user_id', response.data.id)
                        localStorage.setItem('loginname', response.data.loginname)
                })
            }
        }
    }
</script>

<style scoped>
    .login {
        position: relative;
        margin-top: -5rem;
        
    }
    
    .login-key {
        position: relative;
        margin-top: 14rem;
    }
    
    .demo-raised-button {
        margin-top: 6rem;
    }
    
    .demo-menu-divider {
        display: inline-block;
        padding-left: 2rem;
    }
    
    .test {
        display: inline-block;
    }
    
    .my-news-title {
        padding-left: 5rem;
    }
</style>
