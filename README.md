# 云大千寻

## 一、项目介绍

###      1.1  项目背景

-  随着智能手机拍照的发展，图像识别也在市场上渐渐占有了自己的一席之地，其中物品识别等功能更是直接已经投入到了某些项目的使用。而随着移动用户端的快速发展，小程序等名词早已是家喻户晓，比起PC端，手机应用更加受大众所喜爱，其普及也是较为迅速。

- 随着在校大学生人数不断攀升，在学生的日常学习、生活中，丢失物品的现象在每个人身上时有发生，如校园卡，身份证等丢失的情况，人们在丢失物品之后只能盲目搜寻，并且难以找回。（下图为学校部分失物招领处堆积的丢失物）

![image-20201127230853765](https://20201004-1259638372.cos.ap-nanjing.myqcloud.com/image-20201127230853765.png)![image-20201127230907290](https://20201004-1259638372.cos.ap-nanjing.myqcloud.com/image-20201127230907290.png)![image-20201127230915497](https://20201004-1259638372.cos.ap-nanjing.myqcloud.com/image-20201127230915497.png)

​         ![image-20201127231059618](https://20201004-1259638372.cos.ap-nanjing.myqcloud.com/image-20201127231059618.png)                                                          ![image-20201127231114786](https://20201004-1259638372.cos.ap-nanjing.myqcloud.com/image-20201127231114786.png)

-  通过采访了解到有关部门仍然没有找到较好的解决方案，“寻物难”，“寻失主难”的问题依然存在，仍然困扰着每位学子和后勤保障集团的工作人员，大家都希望能够通过信息化手段轻松做到智能寻物。（下图为采访食堂经理画面）

  ![image-20201127231210726](https://20201004-1259638372.cos.ap-nanjing.myqcloud.com/image-20201127231210726.png)

- 本应用可以实现用户手机端拍照进行图像识别，把识别后的特征信息加密传输到服务器。在服务器端数据库找到与特征信息匹配度最高的失主。对于有明确特征的物品（学生证、身份证等）能精确把失物信息发送给失主（创建即时通讯对话）。对于模糊特征的物品（雨伞、课本、帽子等），结合时间，地点以及其他信息。给失主反馈物品图片及其相关信息供其认领。

  

### 1.2  项目简介

​        通过图像识别和即时聊天技术促进失主，丢失物，拾物者之间的联系，连接你与你正在寻找中的ta，借助微信生态让你与ta之间的连接尽在弹指间。聚焦于人本身，以人为本，为用户所想，为用户搜索，解决同学们生活中“寻物难”的生活烦恼，并通过加密技术保障用户信息的安全， 提供便捷，安全的校园服务。

### 1.3 愿景及使命：

​        为你千寻，为你所想。一切以用户价值为依归，一切以用户信息安全为保障，将社会责任融入产品及服务之中。推动同学们之间的友好互助，促进优秀校园文化健康良好发展。

### 1.4  核心功能

​      基于图像识别、加密信息传输和即时通讯对话的失物找寻功能。

### 1.5  基本功能

- 用户授权登录后，小程序“发现”界面中滚动展示最新资讯，该界面的“丢失分类”页面分模块展示各种类型物品的失物招领信息，“技能分享”页面提供“最新失物报告”、“校车时间表”、“云大官方站群”、“返校生活指南”、“校园资讯助手”6个实用功能。 

-  实现用户账号获取，通过“拍一拍”功能从用户手机端拍照，把照片上传到服务器进行图像识别，把识别后获取的图像特征信息加密传输到服务器，搜索服务器端数据库找到与特征信息匹配度最高的失主并发送给用户。让注册过该小程序的失主都能及时收到失物的信息，并及时得到自己丢失的物品，拾取者与失主之间兴许还能交个朋友。
  - 对于具有统一标识、有明确特征的物品（身份证、校园卡等）：能进行准确匹配，可以准确地把失物信息发送给失主——创建物品拾取者与失主之间的即时通讯对话，同时小程序将对聊天内容进行加密处理和审核，保证用户隐私信息的安全。偶尔出现的不能识别或者识别不准确问题可以通过手动填写、修改失物信息。
  - 对于具有模糊信息特征的物品（雨伞、课本、帽子等）：通过上传失物照片展示失物的外观，结合时间，地点以及拾取者联系方式和备注说明信息，给失主反馈物品图片及其相关信息供其认领。

- “我的密码本”功能可以加密存储用户平时容易忘记的各种应用、网站、APP的账号、密码这样的重要信息，给用户提供一个安全、可靠、便捷的密码记录本。

- 连接云大师生常用的“云大微校园”小程序，用户可以便捷地跳转到“云大微校园”小程序使用课表查询、考试安排查询、成绩查询、给分查询等功能，构建云大校园便捷服务生态。

- 提供客服对话功能，给用户提供反馈的渠道，用户在使用过程中遇到了问题随时可以进行功能异常反馈、产品建议反馈以及进行违规举报。

- **程序截图如下：**

  ![1](https://20201004-1259638372.cos.ap-nanjing.myqcloud.com/1.png)

   

  ![2](https://20201004-1259638372.cos.ap-nanjing.myqcloud.com/2.png)

  

  ![3](https://20201004-1259638372.cos.ap-nanjing.myqcloud.com/3.png)

  

###  1.5 开发思路：

利用微信生态，我们选择微信小程序开发。基于微信小程序云开发，采用 serveless 架构，利用云技术平台提供的网络API，快速实现产品业务逻辑，开发出有价值的产品。



### 1.6  亮点特色

-  图像识别下的失主匹配模型。

- 与搜索到的失主动态创建聊天通信。

- 信息加密和图像识别的结合以及它们在失物找寻方面的应用。

- 微信小程序有“不用安装，不用下载”，用户用完即走，优化了用户体验；有“方便易用易传播的优良特性”，很适合在微信群里做推送，快速传播出去。

### 1.7 目标用户人群

- 云大在校大同学、老师、云大教职工和后勤工作人员等。

### 1.8 应用场景

- 易丢物品场所，如实验室，食堂，球场等。

  

## 二、软件架构

​        云大千寻是基于微信小程序云开发开发的小程序，为用户提供解决智慧高效解决用户找寻丢失物的智慧解决方案。

​        技术原理如下：简单来说，这款应用主要实现以下服务和功能。用户手机端拍照，把照片上传到服务器进行图像识别，把识别后的特征信息加密存储到服务器，在服务器端数据库找到匹配的失主信息并发送给用户。物品拾取者可以和失主之间创建对话，同时聊天内容也可做加密处理和审核，让注册过该软件失主都能及时收到答复，让丢失物品的人都能及时得到归还的物品。

- 主要技术：图像识别、加密信息传输、即时通讯对话、云服务、小程序、可视化、信息合法筛查等。

- 工作流程：

![img](https://20201004-1259638372.cos.ap-nanjing.myqcloud.com/wps1.png)

## 三、安装教程

- 下载项目文件

- 用微信小程序开发工具导入项目

- 上传数据库![image-20201113233222361](https://20201004-1259638372.cos.ap-nanjing.myqcloud.com/image-20201113233222361.png)至自己的云开发环境中

- 上传云函数![image-20201113233304755](https://20201004-1259638372.cos.ap-nanjing.myqcloud.com/image-20201113233304755.png)至自己的云开发环境中

- [购买ocr插件](https://developers.weixin.qq.com/community/servicemarket/detail/0006eeb6160ce8429fb8cd3995b815)

- 编译运行即可。

  

## 三、体验

- 微信扫码即可体验云大千寻小程序：

![体验码2](https://20201004-1259638372.cos.ap-nanjing.myqcloud.com/%E4%BD%93%E9%AA%8C%E7%A0%812.png)

- 请为我们投票：4号  腾飞队

  ![投票1](https://20201004-1259638372.cos.ap-nanjing.myqcloud.com/%E6%8A%95%E7%A5%A81.png)

  

## 四、使用组件说明

- 小程序使用了[colorUI组件](https://github.com/weilanwl/ColorUI)和[OCR插件](https://developers.weixin.qq.com/community/servicemarket/detail/0006eeb6160ce8429fb8cd3995b815)以及[百度OCR API](https://cloud.baidu.com/)

  

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

