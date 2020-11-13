// pages/list/list.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lostList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const name = options.name;
    console.log(name)
    if (name == '校园卡') {
      wx.cloud.callFunction({
        name: 'getmain',
        data: {
          xyk: options.name
        },          
      })
      .then (res => {
        console.log('校园卡', res)
        this.setData ({
          lostList: res.result.data,
          length:res.result.data.length
        })
        console.log('校园卡', res.result.data.length)
      })
    } else if (name == '身份证') {
      wx.cloud.callFunction({
        name: 'getmain',
        data: {
          sfz: options.name
        },          
      })
      .then (res => {
        console.log('身份证', res)
        this.setData ({
          lostList: res.result.data,
          length:res.result.data.length
        })
      })
    } else if (name == '银行卡') {
      wx.cloud.callFunction({
        name: 'getmain',
        data: {
          yhk: options.name
        },          
      })
      .then (res => {
        console.log('银行卡', res)
        this.setData ({
          lostList: res.result.data,
          length:res.result.data.length
        })
      })
    } else if (name == '驾驶证') {
      wx.cloud.callFunction({
        name: 'getmain',
        data: {
          jsz: options.name
        },          
      })
      .then (res => {
        console.log('驾驶证', res)
        this.setData ({
          lostList: res.result.data,
          length:res.result.data.length
        })
      })
    } else if (name == '生活用品') {
      wx.cloud.callFunction({
        name: 'getmain',
        data: {
          shyp: options.name,
          
        },          
      })
      .then (res => {
        console.log('生活用品', res)
        this.setData ({
          lostList: res.result.data,
          length:0
        })
      })
    } else if (name == '其他') {
      wx.cloud.callFunction({
        name: 'getmain',
        data: {
          else: options.name
        },          
      })
      .then (res => {
        console.log('其他', res)
        this.setData ({
          lostList: res.result.data,
          length:0
        })
      })
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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