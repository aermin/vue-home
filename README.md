## vue-home

>技术点 

用vue社区提供的API，基于vue+vue-cli+vue-router+axios+webpack开发的vue社区webapp

UI用Muse-UI

css用scss，flex布局，rem做移动端适配，最终效果web端移动端都适配。

用localStorage做缓存

>萌新通过这项目学习了很多东西，如果对您有帮助，请给萌新一个`star`以资鼓励，一起加油^ ^

[效果预览](http://www.hxvin.me/vue-home/dist/)

### 手机扫描查看效果
![手机扫描查看效果](https://github.com/Hxvin/vue-home/blob/master/src/assets/1495982696.png)

> 完成功能

- [x] 首页列表
- [x] 下拉加载
- [x] 用户信息（点击头像）
- [x] 主题内容
- [x] 登录功能
- [x] 收藏（取消收藏）主题
- [x] 评论列表
- [x] 点赞（取消点赞）功能
- [x] 消息中心（已读、未读）
- [x] 个人中心

> todo功能

- [ ] 发表评论
- [ ] 回复评论
- [ ] 发布主题（支持markdown格式）

### 安装运行

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
* 注意`npm run dev` 之后 默认浏览器打开的是http://localhost:8080  请换成http://localhost:8080/vue-home/dist

> 之后我会总结下项目经验和遇到的坑，大家一起爬坑😀

### 项目结构图

```
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── dist
│   ├── index.html
│   └── static
├── index.html
├── node_modules
├── package.json
├── src
│   ├── App.vue
│   ├── assets
│   ├── components
│   ├── main.js
│   ├── pages
│   ├── router
│   └── util
└── static
```
