// pages/personal/personal.js

const util = require('../../utils/util.js');
const app = getApp();
const db = wx.cloud.database();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:"",
    avatarUrl:""
  },

  getuserinfo(e){
    const nickName = e.detail.userInfo.nickName
    const avatarUrl = e.detail.userInfo.avatarUrl
 
    wx.cloud.callFunction({
      name:'getopenid',
      complete:res=>{
        // console.log(res.result.openid)
        const openid = res.result.openid
        wx.setStorageSync('openid',openid)

        db.collection('user').where({
          _openid:openid
        }).get().then(res=>{
          if(res.data == ''){
            db.collection('user').add({
              data:{
                nickName:nickName,
                avatarUrl:avatarUrl,
                time:util.formatTime(new Date())
              }
            }).then(res=>{
              console.log('添加成功')
            })
          }else{
              console.log('存在')
          }
        })
      }
    })
   
    this.setData({
      nickName:nickName,
      avatarUrl:avatarUrl
    })


    wx.setStorageSync('userInfo',e.detail.userInfo)
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
      urls: ['https://786c-xly-zjauh-1301501296.tcb.qcloud.la/else/qq.jpg?sign=94c0994afb23306a274f2d8e0dcaec3f&t=1605066061'],
      current: 'https://786c-xly-zjauh-1301501296.tcb.qcloud.la/else/qq.jpg?sign=94c0994afb23306a274f2d8e0dcaec3f&t=1605066061' // 当前显示图片的http链接      
    })
  },
  showQrcode() {
    wx.previewImage({
      urls: ['https://786c-xly-zjauh-1301501296.tcb.qcloud.la/else/yjtp.png?sign=cb120537d49882319745a2d6857fa806&t=1604634643'],
      current: 'https://786c-xly-zjauh-1301501296.tcb.qcloud.la/else/yjtp.png?sign=cb120537d49882319745a2d6857fa806&t=1604634643' // 当前显示图片的http链接      
    })
  },

  //清理缓存
clearstorage(e){
  try {
    wx.clearStorage({
      success (res) {
        console.log('清理缓存',res)
        wx.showToast({
          title: '清理成功',
          icon:'success',
          duration: 2000,
        })
      }
    })
  } catch(e) {
    console.log(e)
  }
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if(app.globalData.userInfo){
        this.setData({
          nickName:app.globalData.userInfo.nickName,
          avatarUrl:app.globalData.userInfo.avatarUrl
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