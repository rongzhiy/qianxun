// miniprogram/pages/chatroom/chatroom.js
const db = wx.cloud.database()
const chatroomCollection = db.collection('chat_info')
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null, // 存储当前用户的信息
    textInputValue: '', //发送的消息
    chats: [], // 存储聊天记录
    openId: '', //当前用户openid
    receiveId: '', //接受者的openid
    receiveName: '', //接受者的nickName
    args: {} //页面传入的参数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')

    if (options.getopenid && options.getnickname) {
      this.setData({
        receiveId: options.getopenid,
        receiveName: options.getnickname,
        args: options
      })
      console.log("options", options)
    }
    // 用户是否对小程序授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.setData({
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
    
    wx.setNavigationBarTitle({
      title: this.data.receiveName,
    })

    // chatroomCollection.where({      
    // }).watch({      //监听数据库变化
    //   onChange: function (params) {
    //     db.collection('chat_info').where({
    //       _openid: options.getopenid,
    //       receiveId: options.getself,
    //       readFlag: false
    //     }).update({
    //       data: {
    //         readFlag: true
    //       }
    //     })
    //   },   //回调函数
    //   onError(err) {
    //     console.error(err)
    //   }
    // })
    // this.onShow(options)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  async onReady() {
    console.log('onready')
    chatroomCollection.where(_.or([{
          _openid: wx.getStorageSync('openid'),
          receiveId: this.data.args.getopenid
        },
        {
          _openid: this.data.args.getopenid,
          receiveId: wx.getStorageSync('openid')
        }
      ])
    ).watch({ //监听数据库变化
      onChange: this.onChange.bind(this), //回调函数
      onError(err) {
        console.error(err)
      }
    })

    // 获取用户openid
    const {
      result
    } = await wx.cloud.callFunction({
      name: 'login'
    })

    //更新data.openId
    this.setData({
      openId: result.openid
    })
  },

  onChange(snapshot) {
    console.log('onChange')
    // 监听
    console.log("snapshot", snapshot)
    if (snapshot.type == 'init') { // 初始化
      this.setData({
        chats: [ //聊天对话的数据来源
          ...this.data.chats,
          ...[...snapshot.docs].sort((x, y) => x.sendTimeTs - y.sendTimeTs)
        ]
      })
      // console.log('ifchats',this.data.chats)
    } else {
      const chats = [...this.data.chats]
      for (const docChange of snapshot.docChanges) {
        switch (docChange.queueType) {
          case 'enqueue': //新插入的数据
            chats.push(docChange.doc) //加入数组
            break
        }
      }
      this.setData({
        chats: chats.sort((x, y) => x.sendTimeTs - y.sendTimeTs)
      })
      console.log('chats1', chats)
    }

    console.log('chats', this.data.chats)

  },

  onGetUserInfo(e) {
    // 获取用户头像和昵称
    // console.log(e)
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo
      })
    }
  },

  getTime: function (today) { //时间转换函数
    // return today.getMonth()+'/'+today.getDate()+' 周'+today.getDay()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()
    return today.getMonth() + '/' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  },

  onSend() {
    // 发送消息，插入云数据库
    if (!this.data.textInputValue) {
      return
    }

    const doc = {
      textContent: this.data.textInputValue, // 用户输入信息
      avatar: this.data.userInfo.avatarUrl, // 头像
      nickName: this.data.userInfo.nickName, //  昵称
      msgMark: this.data.userInfo.nickName + '_to_' + this.data.receiveName, //发送者nickName+接受者nickName
      receiveId: this.data.receiveId, //接受者openid
      msgType: 'text',
      readFlag: false, //未读
      // lastMsg: true,    //最后一条
      sendTime: this.getTime(new Date()),
      sendTimeTs: Date.now(), //时间戳
    }

    chatroomCollection.add({
      data: doc
    })

    // 清空输入框
    this.setData({
      textInputValue: ''
    })



    console.log("doc", doc)
  },

  onTextInput(e) {
    // 获取用户输入的信息
    this.setData({
      textInputValue: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { //options
    console.log('onShow')
    var that = this
    wx.cloud.callFunction({ //更新为已读
      name: 'updateDb',
      data: {
        sid: that.data.args.getopenid,
      },
      success: res => {
        console.log('更新数据成功', res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.cloud.callFunction({ //更新为已读
      name: 'updateDb',
      data: {
        sid: this.data.args.getopenid,
      },
      success: res => {
        console.log('更新数据成功', res)
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})