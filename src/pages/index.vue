<template>
    <div class="wrapper">
        <HeaderBar></HeaderBar>   
        <HeaderTabs></HeaderTabs>
        <FooterNav></FooterNav>
    </div>
</template>
<script>
    import HeaderBar from '../components/HeaderBar.vue'
    import HeaderTabs from '../components/HeaderTabs.vue'
    import FooterNav from '../components/FooterNav.vue'
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

</style>