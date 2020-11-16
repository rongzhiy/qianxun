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
   /**
   * 用户点击右上角分享
   */
  onShareAppMessage:function(res){
    return {title:'云大千寻小程序'}
  },
  /**
   * 用户点击右上角分享到朋友圈
   */
  onShareTimeline:function(res){
    return{
      title:'云大千寻',
    }
  }

})