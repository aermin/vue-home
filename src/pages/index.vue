<template>
<!--首页-->
    <div class="wrapper">
        <!--顶栏-->
        <HeaderBar></HeaderBar>
        <!--顶部的tabs及列表内容-->
        <HeaderTabs class="tabs"></HeaderTabs>
        <!--底部导航-->
        <FooterNav></FooterNav>
    </div>
</template>

<script>
    import HeaderBar from '../components/HeaderBar.vue'
    import HeaderTabs from '../components/HeaderTabs.vue'
    import FooterNav from '../components/FooterNav.vue'
    import axios from 'axios'
    export default {
        components: {
            FooterNav,
            HeaderBar,
            HeaderTabs
        },
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>

<style scoped lang="scss">
    .wrapper {
        display: flex;
        flex-direction: column;
        height: 100vh;  
        .tabs {
            flex: 1;
            margin: 8rem 0 5rem 0;
        }
    }
</style>