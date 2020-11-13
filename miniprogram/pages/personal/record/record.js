// pages/personal/record/record.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    secretList: [],
    listlength: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的密码本'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {

    wx.getStorage({
      key: 'openid',
      success: res => {
        wx.cloud.callFunction({
          name: "getsecret",
          data: {
            openid: res.data
          }
        }).then(res => {
          this.setData({
            listlength: res.result.data.length,
            secretList: res.result.data
          })
        })
      }
    })
    console.log('keyy', )


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