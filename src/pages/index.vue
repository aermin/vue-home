<template>
    <div class="wrapper">
     <h1>hahaah</h1>
        <!-- <keep-alive> -->
        
        <!-- </keep-alive> -->
        <BottomNavigation></BottomNavigation>
    </div>
</template>
<script>
import BottomNavigation from '../components/BottomNavigation.vue'
export default {
    components: {
        BottomNavigation
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
    height: 100vh;
}

.tab {
    flex: 1;
    margin: 9rem 0 5rem 0;
}

.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
}
</style>