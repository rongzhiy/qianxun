// pages/personal/write/write.js

const util =  require('../../../utils/util.js');
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:true,
    value:''
  },

  textareaInput(e){
    const value = e.detail.value
    const cursor = e.detail.curcor
    if(cursor !== 0){
      this.setData({
        disabled:false,
        value:value
      })
    }else{
      this.setData({
        disabled:true
      })
    }
  },

  getvalue(){
    // console.log(this.data.value)
   db.collection('secret').add({
     data:{
      value:this.data.value,
      time:util.formatTime(new Date())
     }
   }).then(res=>{
    //  console.log('写入成功')
    wx.navigateTo({
      url: '../record/record'
    })
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '记录我的密码'
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