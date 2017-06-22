<template>
  <div class="wrapper">
    <mu-appbar title="发布帖子" class="header">
      <mu-icon-button @click="goback" icon="arrow_back" slot="left" />
    </mu-appbar>
    <div class="main">
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab value="tab1" title="编辑" />
        <mu-tab value="tab2" title="预览" />
      </mu-tabs>
      <div v-if="activeTab === 'tab1'" class="tab1">
        <!--标题-->
        <mu-text-field v-model="editorTitle" label="请写标题" fullWidth labelFloat/>
        <!--选择板块-->
        <mu-select-field class="choose" v-model="tab" label="请选择板块" fullWidth :errorText="errorText">
          <mu-menu-item value="ask" title="回答" />
          <mu-menu-item value="share" title="分享" />
          <mu-menu-item value="job" title="招聘" />
        </mu-select-field>
        <mu-text-field v-model="editorText" label="正文" hintText="建议使用 Markdown 语法" multiLine :rows="10" :rowsMax="12" :fullWidth="true" labelFocusClass="label-focus" underlineFocusClass="underline-focus" />
      </div>
      <!--预览-->
      <mu-flexbox-item v-html="markedText" v-if="activeTab === 'tab2'">
      </mu-flexbox-item>
      <!--确认按钮-->
      <div class="publishBtn">
        <mu-raised-button @click="publishText" label="发布" class="demo-raised-button" primary/>
      </div>
    </div>
    <!--操作反馈-->
    <!--未登陆提示-->
    <mu-dialog :open="!accesstoken" title="温馨提示：">
      请先登录
      <mu-flat-button slot="actions" primary to="/vue-home/dist/" label="取消" />
      <mu-flat-button slot="actions" primary to="/vue-home/dist/login" label="确定" />
    </mu-dialog>
    <!--输入提示-->
    <mu-dialog :open="publish" title="温馨提示：">
      {{tipMsg}}
      <mu-flat-button label="确定" slot="actions" primary @click="close" />
    </mu-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import marked from 'marked'
  export default {
    data() {
      const list = []
      for (let i = 0; i < 30; i++) {
        list.push(`item ${i + 1}`)
      }
      return {
        activeTab: 'tab1',
        accesstoken: '',
        list,
        tab: 'ask',
        editorText: '',
        editorTitle: '',
        tipMsg: '',
        publish: false
      }
    },
    created() {
      this.accesstoken = localStorage.getItem("accesstoken")
    },
    computed: {
      errorText() {
        return this.tab ? '' : '这是必选项'
      },
      markedText() {
        return marked(this.editorText)
      }
    },
    methods: {
      handleTabChange(val) {
        this.activeTab = val
      },
      goback() {
        this.$router.go(-1)
        // 后退一步记录，等同于 history.back()
      },
      // 点击发布
      publishText() {
        let that = this
        // 检测输入是否符合要求
        if (that.editorTitle.length < 10) {
          that.publish = true
          that.tipMsg = "话题标题字数不能小于10个"
          setTimeout(function() {
            that.publish = false
          }, 2000)
        } else if (that.editorText.length < 1) {
          that.publish = true
          that.tipMsg = "文章内容不能为空"
          setTimeout(function() {
            that.publish = false
          }, 2000)
        };
        // 使用markdown编辑器
        that.editorText = marked(this.editorText)
        // 发布上传
        axios.post('https://www.vue-js.com/api/v1/topics', {
            accesstoken: that.accesstoken,
            title: that.editorTitle,
            tab: that.tab,
            content: that.editorText
          })
          .then(function(response) {
            that.publish = true
            that.tipMsg = "发布成功"
            setTimeout(function() {
              that.publish = false
            }, 2000)
          })
          .catch(function(error) {
            that.publish = true
          })
      },
      close() {
        this.publish = false
      }
  
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/sass/_base.scss';
  .wrapper {
    @include wrapper;
    .tab1 {
      padding: 0.6rem;
    }
    .publishBtn {
      display: flex;
      justify-content: center;
      .demo-raised-button {
        position: fixed;
        bottom: 2rem;
      }
    }
  }
</style>
