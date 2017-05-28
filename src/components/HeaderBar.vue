<template>
<mu-appbar class="HeaderBar">
<img class="logo" src="../assets/logo.png">
<mu-icon-button  icon="send" to="/vue-home/dist/publish" slot="right"/>  
</mu-appbar>
</template>

<style scoped>
.HeaderBar{
  position:fixed;
    margin-top:-5rem;;
}
.appbar-search-field {
  color: #FFF;
  margin-bottom: 0;
}
.appbar-search-field.focus-state {
  color: #FFF;
}
.appbar-search-field .mu-text-field-hint {
  color: rgba(255, 255, 255, 0.54);
}
.appbar-search-field .mu-text-field-input {
  color: #FFF;
}
.logo{
  width:4rem;
  height:4rem;
  position:absolute;
  left:0;
  top:0;
}
</style>