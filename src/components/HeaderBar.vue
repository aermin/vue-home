<template>
<mu-appbar class="HeaderBar">
<img class="logo" src="https://www.vue-js.com/public/images/vue.png">
  <mu-text-field icon="search" class="appbar-search-field"  slot="right" hintText="请输入搜索内容"/>
  
  <!--<mu-flat-button color="white" label="确认" slot="right"/> -->
</mu-appbar>
</template>

<style >
.HeaderBar{
  position:relative;
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
/*.appbar-search-field .mu-text-field-focus-line {
  background-color: #FFF;
}*/

.logo{
  width:5rem;
  height:5rem;
  position:absolute;
  left:0;
  top:0;
}
</style>