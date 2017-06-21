## vue-home

>技术点 

用vue社区提供的API，基于vue+vue-cli+vue-router+axios+webpack开发的vue社区webapp

UI用Muse-UI

css用scss，flex布局，rem做移动端适配，最终效果web端移动端都适配。

用localStorage做缓存

>萌新通过这项目学习了很多东西，如果对您有帮助，请给萌新一个`star`以资鼓励，一起加油^ ^

> 建议先去社区[注册](https://www.vue-js.com/signup)拿accesstoken登录体验(注册可以直接用github账号，挺快的)

[效果预览](http://www.hxvin.me/vue-home/dist/)

[项目API](https://www.vue-js.com/api/)
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
- [ ] 左右侧滑
- [ ] 搜索功能

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

> 以下是我总结下的项目经验和遇到的坑（未完待续），大家一起爬坑😀


### 准备开发环境

* $ npm install -g vue-cli 
* $ vue init webpack vue-home

```
? Project name vue-home
? Project description vue-home
? Author afei
? Vue build standalone
? Install vue-router? Yes
? Use ESLint to lint your code? No
? Setup unit tests with Karma + Mocha? No
? Setup e2e tests with Nightwatch? No
```

* $ cd vue-home
* $ npm install
* $ npm run dev

等写完项目后 打包上线
* $ npm run build

>注意：npm run dev 之后 默认浏览器打开的是http://localhost:8080  请换成http://localhost:8080/vue-home/dist
>如果你电脑的8080端口被占用，请congfig/index.js中找到`port: 8080`修改成8081或者其他可用的端口


### 开始动手

#### 项目结构

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
├── dist                  //等写完项目后 $ npm run build 的打包文件
│   ├── index.html
│   └── static
├── index.html            //首页入口文件
├── node_modules
├── package.json          
├── src
│   ├── App.vue           //项目入口文件
│   ├── assets
│   │   ├── 1495982696.png  //手机扫描二维码
│   │   ├── logo.png        //vue logo
│   │   └── sass            //sass通用样式
│   ├── components          //组件
│   │   ├── FooterNav.vue   //底部nav组件
│   │   ├── HeaderBar.vue   //顶部横条
│   │   ├── HeaderTabs.vue  //顶部tabs组件&主页面内容拉取
│   │   └── Hello.vue        
│   ├── main.js             //核心文件 在这里引入了Muse UI 时间过滤器
│   ├── pages               //页面
│   │   ├── content.vue     //帖子内容页面  
│   │   ├── index.vue       //首页
│   │   ├── login.vue       //登录页面
│   │   ├── message.vue     //信息通知页面
│   │   ├── more.vue        
│   │   ├── my.vue          //个人信息页面
│   │   ├── people.vue      //社区用户信息页面
│   │   └── publish.vue     //发布帖子页面(此页面还没写完)
│   ├── router              //路由与组件配置
│   │   └── index.js 
│   └── util                //时间过滤器，转换时间格式
│       └── filter.js
└── static
```
#### vue-home/config/index.js 

![vue-home/config/index.js图](http://upload-images.jianshu.io/upload_images/5287253-30138bb5cd33b265.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

``  
assetsPublicPath: '/vue-home/dist'
``

> 这个公共路径原本为assetsPublicPath: '/'，这样在本地服务器是可以跑，可是打包上传到github后会发现打开的页面是空白的，报错如下图。


![网页加载报错图](http://upload-images.jianshu.io/upload_images/5287253-82edc72f02251f48.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

原因是路径错了，vue-home是项目文件夹名称，dist是npm run build之后出现的文件夹，github上线就是读取dist文件夹而生成的网页（成功展示的demo地址长这样：http://www.hxvin.me/vue-home/dist/）


![github图](http://upload-images.jianshu.io/upload_images/5287253-86ca75ba374431a7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

解决上线路径问题不知道还有没有其他更方便的解决方法，如果有，请跟我讲下哦

> port: 8080 这个是让你改端口的

#### vue-home/src/App.vue 
![vue-home/src/App.vue图](http://upload-images.jianshu.io/upload_images/5287253-711de34d2a7e98b0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


rem适配移动端，1rem=10px

```
html{
  font-size: 62.5%;
 
}

```
建议注释掉这段，不然会然干扰后面的css

```
  /*text-align: center;*/
  /*color: #2c3e50;
  margin-top: 60px;*/
```
#### /vue-home/index.html

![/vue-home/index.html图](http://upload-images.jianshu.io/upload_images/5287253-6c3ef9e8a11a259b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我们是做的移动端，适配web端，所以在index.html里面加上meta

```
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
```
用MuseUI的添加之一

```
 <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">
 <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">  
```

#### vue-home/src/main.js

![vue-home/src/main.js图](http://upload-images.jianshu.io/upload_images/5287253-6dbc7c159543aefc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

图中有标识了哪些是用来干嘛的，分别是用MuseUI的添加之一；filters是用来把社区api数据中的时间格式转换成`*分钟前``*小时前``*天前`
