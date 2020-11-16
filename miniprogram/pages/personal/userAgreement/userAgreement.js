// pages/personal/userAgreement/userAgreement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onPullDownRefresh: function () {
    // console.log('这是下拉刷新控制台输出的内容：其实就是跟查询数据库内容一样的功能，后期完善');
    this.onLoad();
    wx.stopPullDownRefresh()
    console.log('刷新成功')
    wx.showToast({
      title: '刷新成功',
      icon:'none'
    })
},

})