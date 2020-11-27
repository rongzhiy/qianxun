// pages/list/list.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    lostList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
      icon: 'loading',
    })
    var name = options.name;
    console.log(name)
    if (name == '校园卡') {
      wx.setNavigationBarTitle({
        title: '校园卡列表'
      })
      wx.cloud.callFunction({
          name: 'getmain',
          data: {
            xyk: options.name
          },
        })
        .then(res => {
          console.log('校园卡', res)
          this.setData({
            lostList: res.result.data,
            length: res.result.data.length
          })
          console.log('校园卡', res.result.data.length)
          setTimeout(function () {
            wx.hideLoading()
          }, 500)
        })
    }
    //身份证列表
    else if (name == '身份证') {
      wx.setNavigationBarTitle({
        title: '身份证列表'
      })
      wx.cloud.callFunction({
          name: 'getmain',
          data: {
            sfz: options.name
          },
        })
        .then(res => {
          console.log('身份证', res.result.data.length)
          this.setData({
            lostList: res.result.data,
            length: res.result.data.length
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 500)
        })
    }
    //银行卡列表
    else if (name == '银行卡') {
      wx.setNavigationBarTitle({
        title: '银行卡列表'
      })
      wx.cloud.callFunction({
          name: 'getmain',
          data: {
            yhk: options.name
          },
        })
        .then(res => {
          console.log('银行卡', res.result.data.length)
          this.setData({
            lostList: res.result.data,
            length: res.result.data.length
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 500)
        })
    }
    //驾驶证列表
    else if (name == '驾驶证') {
      wx.setNavigationBarTitle({
        title: '驾驶证列表'
      })
      wx.cloud.callFunction({
          name: 'getmain',
          data: {
            jsz: options.name
          },
        })
        .then(res => {
          console.log('驾驶证', res.result.data.length)
          this.setData({
            lostList: res.result.data,
            length: res.result.data.length
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 500)
        })
    }
    //生活用品列表
    else if (name == '生活用品') {
      wx.setNavigationBarTitle({
        title: '生活用品列表'
      })
      wx.cloud.callFunction({
          name: 'getmain',
          data: {
            shyp: options.name,
          },
        })
        .then(res => {
          console.log('生活用品', res.result.data)
          this.setData({
            lostList: res.result.data,
            length: res.result.data.length
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 500)
        })
    }
    //其他物品列表
    else if (name == '其他') {
      wx.setNavigationBarTitle({
        title: '求他丢失物列表'
      })
      wx.cloud.callFunction({
          name: 'getmain',
          data: {
            else: options.name
          },
        })
        .then(res => {
          console.log('其他', res.result.data.length)
          this.setData({
            lostList: res.result.data,
            length: res.result.data.length
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 500)
        })
    }
    //书籍列表
    else if (name == '书籍') {
      wx.setNavigationBarTitle({
        title: '书籍列表'
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 50)
      wx.showModal({
        title: '温馨提示',
        content: '该功能将在后续开发，敬请期待~',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.switchTab({
              url: '../../pages/main/main',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
            wx.switchTab({
              url: '../../pages/main/main',
            })
          }
        }
      })

    }
    //电子设备列表
    else if (name == '电子设备') {
      wx.setNavigationBarTitle({
        title: '电子设备列表'
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 50)
      wx.showModal({
        title: '温馨提示',
        content: '该功能将在后续开发，敬请期待~',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.switchTab({
              url: '../../pages/main/main',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
            wx.switchTab({
              url: '../../pages/main/main',
            })
          }
        }
      })

    }
    //寻人列表
    else if (name == '寻人') {
      wx.setNavigationBarTitle({
        title: '寻人列表'
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 50)
      wx.showModal({
        title: '温馨提示',
        content: '该功能将在后续开发，敬请期待~',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.switchTab({
              url: '../../pages/main/main',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
            wx.switchTab({
              url: '../../pages/main/main',
            })
          }
        }
      })
    }


  },

  // onPullDownRefresh: function () {
  //   // console.log('这是下拉刷新控制台输出的内容：其实就是跟查询数据库内容一样的功能，后期完善');
  //   this.onLoad();
  //   wx.stopPullDownRefresh()
  //   console.log('刷新成功')
  //   wx.showToast({
  //     title: '刷新成功',
  //     icon: 'none'
  //   })
  // },
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