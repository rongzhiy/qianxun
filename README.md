# 云大千寻

## 一、项目介绍

​        随着智能手机拍照的发展，图像识别也在市场上渐渐占有了自己的一席之地，其中物品识别等功能更是直接已经投入到了某些项目的使用。而随着移动用户端的快速发展，小程序等名词早已是家喻户晓，比起PC端，手机应用更加受大众所喜爱，其普及也是较为迅速。

​        在人们的日常生活中，丢失物品的现象在每个人身上时有发生。人们在丢失物品之后只能盲目搜寻，并且难以找回。“找物难”、“找失主难”成了人们的强烈需要。本应用可以实现用户手机端拍照进行图像识别，把识别后的特征信息加密传输到服务器。在服务器端数据库找到与特征信息匹配度最高的失主。对于有明确特征的物品（学生证、身份证等）能精确把失物信息发送给失主（创建即时通讯对话）。对于模糊特征的物品（雨伞、课本、帽子等），结合时间，地点以及其他信息。给失主反馈物品图片及其相关信息供其认领。

**核心功能**

基于图像识别、加密传输的失物找寻系统

**应用场景**

易丢物品场所，如实验室，食堂，球场等

**开发思路**

基于小程序 云开发，采用serveless架构，快速开发

**亮点特色**

结合图像识别和加密算法及运用在失物找寻方面

**程序截图如下：**

![1](https://20201004-1259638372.cos.ap-nanjing.myqcloud.com/1.png)

 

![2](https://20201004-1259638372.cos.ap-nanjing.myqcloud.com/2.png)



![3](https://20201004-1259638372.cos.ap-nanjing.myqcloud.com/3.png)



## 二、软件架构

云大千寻是基于微信小程序云开发开发的小程序，为用户提供解决智慧高效解决用户找寻丢失物的智慧解决方案。

技术原理如下：简单来说，这款应用主要实现以下服务和功能。用户手机端拍照，把照片上传到服务器进行图像识别，把识别后的特征信息加密存储到服务器，在服务器端数据库找到匹配的失主信息并发送给用户。物品拾取者可以和失主之间创建对话，同时聊天内容也可做加密处理和审核，让注册过该软件失主都能及时收到答复，让丢失物品的人都能及时得到归还的物品，兴许还能交个朋友。该软件每周都会统计丢失物品信息，以图片，表格等直观的方式提示大家本周注意可能遗失的物品。该软件还可以定制遗失提醒服务，比如经常容易把钥匙忘在家里的用户，每天早晨都会提醒您，不要忘了带走您的钥匙。



## 三、安装教程

- 下载项目文件

- 用微信小程序开发工具导入项目

- 上传数据库![image-20201113233222361](https://20201004-1259638372.cos.ap-nanjing.myqcloud.com/image-20201113233222361.png)至自己的云开发环境中

- 上传云函数![image-20201113233304755](https://20201004-1259638372.cos.ap-nanjing.myqcloud.com/image-20201113233304755.png)至自己的云开发环境中

- [购买ocr插件](https://developers.weixin.qq.com/community/servicemarket/detail/0006eeb6160ce8429fb8cd3995b815)

- 编译运行即可。

  

## 三、体验

微信扫码体验云大千寻小程序：

![云大千寻体验码](https://20201004-1259638372.cos.ap-nanjing.myqcloud.com/%E4%BA%91%E5%A4%A7%E5%8D%83%E5%AF%BB%E4%BD%93%E9%AA%8C%E7%A0%81.jpg)

## 四、使用组件说明

小程序使用了[colorUI组件](https://github.com/weilanwl/ColorUI)和[OCR插件](https://developers.weixin.qq.com/community/servicemarket/detail/0006eeb6160ce8429fb8cd3995b815)



## 五、目录结构说明

miniprogram

- colorui  colorui组件文件

- components  组件文件

- image   图片文件夹

- pages 

  - article   写文章的文件夹
  - chat_list   聊天列表文件夹
  - chatroom  聊天室文件夹
  - launch   启动页文件夹
  - list   文章列表文件夹
  - main   主页文件夹
  - message  消息文件夹（暂没用）
  - pai   拍一拍页
    - bankcard  识别银行卡页
    - carcard  识别驾驶证页
    - idcard    识别身份证页
    - studentcard  识别学生证页
  - personal  个人中心页
    - about  项目说明页
    - chat  （暂没用）
    - form   收集表单页
    - record  密码本页
    - search  （暂没用）
    - userAgreement  用户协议页
    - write  记录密码页
  - xun  （暂没用）

- utils 

- app.js

- app.json

- app.wxss

- sitemap.json 

  

### app.js globalData说明，以下变量为全局变量

```javascript
//app.js
App({

  onLaunch: function() {
    //初始化
    wx.cloud.init({
      env: ''
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //获取系统信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;  
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })

    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
         	this.globalData.Custom = capsule;
        	this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
        	this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
  globalData: {
    userInfo: wx.getStorageSync('userInfo'),
    openid: wx.getStorageSync('openid')
  }
})
```

