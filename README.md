# 云大千寻

[原文](https://mp.weixin.qq.com/s/-F8loow3iFXslZPRfhcV_A)

# 云大千寻

## 一、项目介绍
### 1.1  项目背景

- 随着智能手机拍照的发展，图像识别也在市场上渐渐占有了自己的一席之地，其中物品识别等功能更是直接已经投入到了某些项目的使用。而随着移动用户端的快速发展，小程序等名词早已是家喻户晓，比起PC端，手机应用更加受大众所喜爱，其普及也是较为迅速。
- 随着在校大学生人数不断攀升，在学生的日常学习、生活中，丢失物品的现象在每个人身上时有发生，如校园卡，身份证等丢失的情况，人们在丢失物品之后只能盲目搜寻，并且难以找回。（下图为学校部分失物招领处堆积的丢失物）

![](https://mmbiz.qpic.cn/mmbiz_png/esicKz9LFmDZOXhxUyb8UR8ZnforCTHTmQQvkjUbFrGxrsMgWykkibG8GN17a7r4eC7NAKQtAX1JSwsv2c4ktWmQ/640?wx_fmt=png#height=233&id=FAiby&originHeight=156&originWidth=207&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=&width=309)
![](https://mmbiz.qpic.cn/mmbiz_png/esicKz9LFmDZOXhxUyb8UR8ZnforCTHTmgS1KA7KvSfiaj2xXSncd8Rv6Vt3oic139GSog4W1ZmyFxHL2jI1eIibSw/640?wx_fmt=png#height=289&id=uh3Jm&originHeight=175&originWidth=131&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=&width=216)

- 本应用可以实现用户手机端拍照进行图像识别，把识别后的特征信息加密传输到服务器。在服务器端数据库找到与特征信息匹配度最高的失主。对于有明确特征的物品（学生证、身份证等）能精确把失物信息发送给失主（创建即时通讯对话）。对于模糊特征的物品（雨伞、课本、帽子等），结合时间，地点以及其他信息。给失主反馈物品图片及其相关信息供其认领。
### 1.2  项目简介
通过图像识别和即时聊天技术促进失主，丢失物，拾物者之间的联系，连接你与你正在寻找中的ta，借助微信生态让你与ta之间的连接尽在弹指间。聚焦于人本身，以人为本，为用户所想，为用户搜索，解决同学们生活中“寻物难”的生活烦恼，并通过加密技术保障用户信息的安全， 提供便捷，安全的校园服务。
### 1.3 愿景及使命：
为你千寻，为你所想。一切以用户价值为依归，一切以用户信息安全为保障，将社会责任融入产品及服务之中。推动同学们之间的友好互助，促进优秀校园文化健康良好发展。
### 1.4  核心功能
基于图像识别、加密信息传输和即时通讯对话的失物找寻功能。
### 1.5  基本功能

- 用户授权登录后，小程序“发现”界面中滚动展示最新资讯，该界面的“丢失分类”页面分模块展示各种类型物品的失物招领信息，“技能分享”页面提供“最新失物报告”、“校车时间表”、“云大官方站群”、“返校生活指南”、“校园资讯助手”6个实用功能。
- 实现用户账号获取，通过“拍一拍”功能从用户手机端拍照，把照片上传到服务器进行图像识别，把识别后获取的图像特征信息加密传输到服务器，搜索服务器端数据库找到与特征信息匹配度最高的失主并发送给用户。让注册过该小程序的失主都能及时收到失物的信息，并及时得到自己丢失的物品，拾取者与失主之间兴许还能交个朋友。
- 对于具有统一标识、有明确特征的物品（身份证、校园卡等）：能进行准确匹配，可以准确地把失物信息发送给失主，创建物品拾取者与失主之间的即时通讯对话，同时小程序将对聊天内容进行加密处理和审核，保证用户隐私信息的安全。偶尔出现的不能识别或者识别不准确问题可以通过手动填写、修改失物信息。
- 对于具有模糊信息特征的物品（雨伞、课本、帽子等）：通过上传失物照片展示失物的外观，结合时间，地点以及拾取者联系方式和备注说明信息，给失主反馈物品图片及其相关信息供其认领。
- “我的密码本”功能可以加密存储用户平时容易忘记的各种应用、网站、APP的账号、密码这样的重要信息，给用户提供一个安全、可靠、便捷的密码记录本。
- 连接云大师生常用的“云大微校园”小程序，用户可以便捷地跳转到“云大微校园”小程序使用课表查询、考试安排查询、成绩查询、给分查询等功能，构建云大校园便捷服务生态。
- 提供客服对话功能，给用户提供反馈的渠道，用户在使用过程中遇到了问题随时可以进行功能异常反馈、产品建议反馈以及进行违规举报。

**程序截图如下：**

![1.png](https://cdn.nlark.com/yuque/0/2023/png/1143997/1680094328815-bf8835d9-b01c-4d10-9ffc-8a862dd742c7.png#averageHue=%23eeedec&clientId=ubeaf8f62-91ef-4&from=paste&height=523&id=yijwa&name=1.png&originHeight=523&originWidth=1206&originalType=binary&ratio=1&rotation=0&showTitle=false&size=335099&status=done&style=none&taskId=ud376569e-ccef-4f57-9927-7ba208286fc&title=&width=1206)

首页“看一看”功能

![2.png](https://cdn.nlark.com/yuque/0/2023/png/1143997/1680094328639-f0374f4c-6331-4942-9813-9d61fec163ed.png#averageHue=%23f1e7df&clientId=ubeaf8f62-91ef-4&from=paste&height=524&id=H9qFW&name=2.png&originHeight=524&originWidth=1191&originalType=binary&ratio=1&rotation=0&showTitle=false&size=105643&status=done&style=none&taskId=uf58af47c-0889-4903-bc42-2bc90e98672&title=&width=1191)

拍照识别提取物品信息 ->与失主建立对话

![3.png](https://cdn.nlark.com/yuque/0/2023/png/1143997/1680094328912-89f9f8b2-c38d-4a48-a52a-354ee80f82a6.png#averageHue=%23e3e1de&clientId=ubeaf8f62-91ef-4&from=paste&height=523&id=rPtlm&name=3.png&originHeight=523&originWidth=1333&originalType=binary&ratio=1&rotation=0&showTitle=false&size=441200&status=done&style=none&taskId=u921b0a84-e95c-471b-9dc7-95886003cc7&title=&width=1333)

一些日志、工具箱功能

### 1.5 开发思路：

利用微信生态，我们选择微信小程序开发。基于微信小程序云开发，采用 serveless 架构，利用云技术平台提供的网络API，快速实现产品业务逻辑，开发出有价值的产品。
### 1.6  亮点特色

- 图像识别下的失主匹配模型。
- 与搜索到的失主动态创建聊天通信。
- 信息加密和图像识别的结合以及它们在失物找寻方面的应用。
- 微信小程序有“不用安装，不用下载”，用户用完即走，优化了用户体验；有“方便易用易传播的优良特性”，很适合在微信群里做推送，快速传播出去。
### 1.7 目标用户人群

- 云大在校大同学、老师、云大教职工和后勤工作人员等。
### 1.8 应用场景

- 易丢物品场所，如实验室，食堂，球场等。

## 二、软件架构

云大千寻是基于微信小程序云开发开发的小程序，为用户提供解决智慧高效解决用户找寻丢失物的智慧解决方案。技术原理如下：简单来说，这款应用主要实现以下服务和功能。用户手机端拍照，把照片上传到服务器进行图像识别，把识别后的特征信息加密存储到服务器，在服务器端数据库找到匹配的失主信息并发送给用户。物品拾取者可以和失主之间创建对话，同时聊天内容也可做加密处理和审核，让注册过该软件失主都能及时收到答复，让丢失物品的人都能及时得到归还的物品。

- 主要技术：图像识别、加密信息传输、即时通讯对话、云服务、小程序、可视化、信息合法筛查等。
- 图像识别主要工作流程：

![](https://mmbiz.qpic.cn/mmbiz_png/esicKz9LFmDZOXhxUyb8UR8ZnforCTHTmqLO8BdMaWTWjOddbgtXxUPtkbZOnJkSbs7ObpUkiaZu2ibbrCiaLbGmfA/640?wx_fmt=png#id=wvPoK&originHeight=230&originWidth=519&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

## 三、体验

微信扫码即可体验云大千寻小程序：

![](https://mmbiz.qpic.cn/mmbiz_png/esicKz9LFmDZOXhxUyb8UR8ZnforCTHTm9KUnklnaR4xNdWibVxarar3LXicNZYNcspDKbAmTqo3s6KOnSE8HrSOg/640?wx_fmt=png#id=q1GKR&originHeight=520&originWidth=400&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
## 四、使用组件说明

小程序使用了[colorUI组件](https://github.com/weilanwl/ColorUI)、[OCR插件](https://developers.weixin.qq.com/community/servicemarket/detail/0006eeb6160ce8429fb8cd3995b815)和[百度OCR API](https://cloud.baidu.com/)
## 五、说明
### 说明

**「如何匹配到用户？」**

> ❝用户使用小程序，首先是先阅读我们的程序“用户协议”，然后授权进入小程序使用小程序所提供的服务。用户可以选择完善信息，这样等用户某类有确切标识的物品丢失后，他人拍照便可识别匹配进行即时通信，然后找回。❞


**「如何保障用户信息安全？」**

> ❝我们对用户的提交的表单信息进行加密传输与存储。在展示的时候尽量不暴露用户的私人信息。或者通过一些技术手段进行拾物者、失主身份鉴别，确保不出现错领，乱领的现象出现。对于故意领取别人物品的人，我们将会对此列入黑名单，不允许其再次使用小程序，并且如果有必要的话，会向公安机关报警立案。❞


**「程序是否投入使用？」**

> ❝本项目作为“云大微校园项目”的支线项目，目前没有投入使用，只是体验版。由于是个人开发者的原因以及其他原因，未能对用户信息安全做出可靠的保证，但我们已申请了软著来保证我们的idea不被后来者剽窃。如果你喜欢我们的作品，敬请期待我们的发布。❞



