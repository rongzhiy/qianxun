// pages/personal/record/record.js
const app = getApp();
const Encrypt = require('../../../utils/jsencrypt.min.js')

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
    wx.showToast({
      title: '正在加载...',
      icon:"loading",
      duration:2000
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onDecrypt: function (arrg) {
    var privateKey = 'MIICXAIBAAKBgQDRqZTEYAUAWJ2gW0pI+Qw0duWo/T3vV56PJIqac5SeMte7oQ/pn1PBeDqH1CH+pG4jYzfzYbN4B8Chd6Yl6cyAlfUkI7Y4BPjECGLWKQ8u6sWjCipMPREuPkEVxGDvkgqWjbidy3C3c5XUNzU8I+luxxY8dIO87XPAYh1RLogNVwIDAQABAoGAWOrEjuvx8w2h++n7fSsyA+YQzDRqWeEc+7QRnCM8ekMxvv81kmzhxoFIwWYz7JyroRJpHiznQhZ3mYL20clv0qwx4avHj59S8uwyxakGZATA46wsYRPKH9RjFB11LI3TwwlwV+xKH10oJnFNB3t9Jgdaa+i8gfSKB3OGafIn0UECQQDt/hn+AKtBktldO1JfGGUmpNOw6+We5TVmEh90a41YVeL0xa+zSzHByiD5IuwaVcHTHcjjno67J83AbaV5z4nHAkEA4Ya5/+W+zj4yvYXsyrgEchcK8zCJW9gfP3/0qvwD5kE1+NGcpe84OK42IWT/lkp5WbmtusgDZO/Sv585tcXf8QJBAJAIe9SUtRCffjuFfmmdCwKjOJbXfYV3tKSMjUrZGJcAi7WVuqso8/kTincdIoUhp4dMfFr9h+ZOxaAS+9XHu9sCQFwZtSP4Iy/+3qHfa5BuDgK5vlMKY04KuNgp3TVmrgD+aJgwohRx2TfsjVad9HLf/ybRWU2KGTjDaAGxeNPu90ECQCK7FsL7zQJDwRjM4MenAsZQxh/bvVaw0GhjgB0Z5IfJxo5e+PZY50HlwSj1sgujia0Vl/uQph8xEsDbLXbkz/o='
    // 解密
    const decryptor = new Encrypt.JSEncrypt()
    decryptor.setPrivateKey(privateKey)
    arrg.forEach(element => {
      if (element.value && element.value != null) {
        element.value = decryptor.decrypt(element.value)
      }
    });
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
          console.log('rescord',res)
          var list = [...res.result.data]
          this.onDecrypt(list)
          this.setData({
            listlength: res.result.data.length,
            secretList: list
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