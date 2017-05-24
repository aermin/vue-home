<template>
    <div class="wrapper">
        <HeaderBar></HeaderBar>   
        <HeaderTabs class="tab"></HeaderTabs>
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
<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    height: 100rem;  
}

.tab {
    /*flex: 1;*/
    margin: 3rem 0 5rem 0;
}
</style>