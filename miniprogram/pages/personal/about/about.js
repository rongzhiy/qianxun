// pages/person/about/about.js

const g = getApp().globalData;
var this_page;
const xutils = getApp().xutils;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab1: true,
    des: ' 云大千寻是基于微信小程序云开发开发的移动APP，为用户提供解决智慧高效解决用户找寻丢失物的智慧解决方案。技术原理如下：简单来说，这款应用主要实现以下服务和功能。用户手机端拍照，把照片上传到服务器进行图像识别，把识别后的特征信息加密存储到服务器，在服务器端数据库找到匹配的失主信息并发送给用户。物品拾取者可以和失主之间创建对话，同时聊天内容也可做加密处理和审核，让注册过该软件失主都能及时收到答复，让丢失物品的人都能及时得到归还的物品，兴许还能交个朋友。该软件每周都会统计丢失物品信息，以图片，表格等直观的方式提示大家本周注意可能遗失的物品。该软件还可以定制遗失提醒服务，比如经常容易把钥匙忘在家里的用户，每天早晨都会提醒您，不要忘了带走您的钥匙。欢迎使用云大千寻小程序！我们竭诚为你提供最优质、最安全的服务！'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this_page = this;
    
  },

  switchNav(event) {
    //导航栏                      
    this.setData({
      tab1: !this_page.data.tab1
    });
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
//复制
    copy(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.copy,
        success: res => {
          wx.showToast({
            title: '复制' + e.currentTarget.dataset.name + '成功',
            icon: 'success',
            duration: 1000,
          })
        }
      })
    },
    toUserAgreement() {
      wx.navigateTo({
        url: '../userAgreement/userAgreement'
      });
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