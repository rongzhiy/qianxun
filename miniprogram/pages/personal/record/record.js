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
  onPullDownRefresh: function () {
    // console.log('这是下拉刷新控制台输出的内容：其实就是跟查询数据库内容一样的功能，后期完善');
    this.onShow()
    console.log('密码记录刷新成功')
    wx.stopPullDownRefresh()
    wx.showToast({
      title: '刷新成功',
      icon:'none'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '云大千寻小程序'
    }
  },
  /**
   * 用户点击右上角分享到朋友圈
   */
  onShareTimeline: function (res) {
    return {
      title: '云大千寻',
    }
  }

})