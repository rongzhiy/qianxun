// pages/personal/personal.js
const util = require('../../utils/util.js');
const app = getApp();
const db = wx.cloud.database();

Page({
  data: {
    nickName: "",
    avatarUrl: "", 
    openid:''
  },

  getuserinfo(e) {
    let that=this;
    that.setData({
       nickName : e.detail.userInfo.nickName,
       avatarUrl : e.detail.userInfo.avatarUrl
    })
   
    wx.cloud.callFunction({
      name: 'getopenid',
      success: res => {
        // console.log(res.result.openid)
        that.setData({
          openid:res.result.openid
        })
        wx.setStorageSync('openid', that.data.openid)    
        console.log(that.data.openid,"授权成功登录")

        //查看数据库users里面是否有该用户openid,没有的话写入数据库
        db.collection('users').where({
          _openid: that.data.openid
        }).get().then(res => {
          if (res.data == '') {
            db.collection('users').add({
              data: {
                nickName: that.data.nickName,
                avatarUrl: that.data.avatarUrl,
                time: util.formatTime(new Date())
              }
              
            }).then(res => {
              console.log('添加成功',res)
            }).catch(err => {
             console.log("添加失败",err)
            })
          } else {
            console.log('存在')
          }
        })
      },
      fail: err=>{
           console.log("获取用户信息错误".err)
      }
    })

    wx.setStorageSync('userInfo', e.detail.userInfo)
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
  //跳转到云大微校园
  tiao:function(){
    wx.navigateToMiniProgram({
      appId: 'wx0bb4e16473531e8d',
      path: 'pages/index/index',
      extraData: {
      foo: 'bar'
      },
      envVersion: 'release',
      success(res) {
      // 打开成功
      }
      })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
    let that = this
    wx.cloud.callFunction({
      name: 'getopenid',
      success: res => {
        // console.log(res.result.openid)
        that.setData({
          openid:res.result.openid
        })
        wx.setStorageSync('openid', that.data.openid)    
        console.log(that.data.openid,"onload")
        //查看数据库users里面是否有该用户openid,有的话获取userInfo
        db.collection('users').where({
          _openid: that.data.openid
        }).get().then(res => {
          if (res.data != '') {
            console.log(res)
          that.setData({
            nickName:res.data[0].nickName,
            avatarUrl:res.data[0].avatarUrl
          })
          wx.setStorageSync("userInfo",res.data[0]) 
          } else {
            // console.log('')
          }
        })
      },
      fail: err=>{
           console.log("获取用户信息错误".err)
      }
    })


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