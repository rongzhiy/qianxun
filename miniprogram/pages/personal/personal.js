// pages/personal/personal.js

const util = require('../../utils/util.js');
const app = getApp();
const db = wx.cloud.database();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    avatarUrl: "",


  },

  getuserinfo(e) {
    const nickName = e.detail.userInfo.nickName
    const avatarUrl = e.detail.userInfo.avatarUrl

    wx.cloud.callFunction({
      name: 'getopenid',
      complete: res => {
        // console.log(res.result.openid)
        const openid = res.result.openid
        wx.setStorageSync('openid', openid)
         
        this.setData({
          nickName: nickName,
          avatarUrl: avatarUrl,
          openid : openid
        })

        db.collection('users').where({
          _openid: openid
        }).get().then(res => {
          if (res.data == '') {
            db.collection('uses').add({
              data: {
                nickName: nickName,
                avatarUrl: avatarUrl,
                time: util.formatTime(new Date())
              }
            }).then(res => {
              console.log('添加成功')
            })
          } else {
            console.log('存在')
          }
        })
      }
    })

   


    wx.setStorageSync('userInfo', e.detail.userInfo)
    //连接数据库，保存用户信息
    // db.collection('user').add({
    //   data:{
    //     nickName :nickName,
    //     avatarUrl:avatarUrl
    //   }
    // }).then(res=>{
    //   console.log('添加成功')
    // })
  },
  showqq(e) {
    wx.previewImage({
      urls: ['https://786c-xly-zjauh-1301501296.tcb.qcloud.la/else/qq.jpg'],
      current: 'https://786c-xly-zjauh-1301501296.tcb.qcloud.la/else/qq.jpg' // 当前显示图片的http链接      
    })
  },
  showQrcode() {
    wx.previewImage({
      urls: ['https://786c-xly-zjauh-1301501296.tcb.qcloud.la/else/yjtp.png'],
      current: 'https://786c-xly-zjauh-1301501296.tcb.qcloud.la/else/yjtp.png' // 当前显示图片的http链接      
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('users').where({
      _openid: this.data.openid
    }).get().then(res => {
      if (res.data == '') {
        this.getuserinfo()

      } else {
        wx.cloud.callFunction({
          name: 'getopenid',
          complete: res => {
            const openid = res.result.openid
            wx.setStorageSync('openid', openid)
          }
        })
      }
    })

    if (app.globalData.userInfo) {
      this.setData({
        nickName: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl
      })
    }
    wx.setNavigationBarTitle({
      title: '个人中心'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  toUserAgreement() {
    wx.navigateTo({
      url: '../../pages/personal/userAgreement/userAgreement'
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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