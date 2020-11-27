// pages/personal/write/write.js
const util =  require('../../../utils/util.js');
const db = wx.cloud.database();
const Encrypt = require('../../../utils/jsencrypt.min.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:true,
    value:''
  },

 onEncrypt: function (args) {
  var publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDRqZTEYAUAWJ2gW0pI+Qw0duWo/T3vV56PJIqac5SeMte7oQ/pn1PBeDqH1CH+pG4jYzfzYbN4B8Chd6Yl6cyAlfUkI7Y4BPjECGLWKQ8u6sWjCipMPREuPkEVxGDvkgqWjbidy3C3c5XUNzU8I+luxxY8dIO87XPAYh1RLogNVwIDAQAB'
  let encryptor = new Encrypt.JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(args) // 对需要加密的数据进行加密
 },

  textareaInput(e){
    const value = e.detail.value
    const cursor = e.detail.curcor
    if(cursor !== 0){
      this.setData({
        disabled:false,
        value: this.onEncrypt(value)
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