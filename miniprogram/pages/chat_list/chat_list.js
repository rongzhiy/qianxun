// miniprogram/pages/list/list.js
const db = wx.cloud.database()
const usersCollection = db.collection('users')

Page({

   /**
    * 页面的初始数据
    */
   data: {
      userList: [],
      myId: '',
      options: {},
      bankid: '',
      searchOwnerId: ''
   },


   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      console.log("options", options)
      wx.showToast({
         title: '查找中，请稍后...',
         icon: 'loading',
         duration: 3000
      })
      //银行卡
      if (options.bankid != undefined) {
         wx.cloud.callFunction({
               name: 'searchOwner',
               data: {
                  banknum: options.bankid
               }
            })
            .then(res => {
               console.log('cloud-search', res)
               if (res.result) {
                  // console.log('res.result.data[0]._openid', res.result.data[0]._openid)
                  this.setData({
                     searchOwnerId: res.result.data[0]._openid
                  })
                  console.log('res.result.data[0]._openid', res.result.data[0]._openid)
                  db.collection('users').where({
                     _openid: res.result.data[0]._openid
                  }).get({
                     success: res2 => {
                        console.log('res2', res2)
                        if (res2.data[0]._openid == wx.getStorageSync('openid')) {
                           wx.showToast({
                              title: '查找失败，该失主是您自己！',
                              icon: 'none',
                              duration: 10000
                           })
                        } else {
                           console.log('searchOw', res2)
                           this.setData({
                              userList: res2.data
                           })
                        }
                        // console.log('[数据库] [查询记录] 成功: ', res)
                     },
                     fail: err => {
                        wx.showToast({
                           icon: 'none',
                           title: '查询记录失败'
                        })
                        console.error('[数据库] [查询记录] 失败：', err)
                     }
                  })
               }
            })
            .catch(err => {
               console.log('err', err)
            })
      } 
      //校园卡
      else if (options.stuid != undefined) {
         wx.cloud.callFunction({
               name: 'searchOwner',
               data: {
                  stunum: options.stuid
               }
            })
            .then(res => {
               console.log('cloud-search', res)
               if (res.result) {
                  // console.log('res.result.data[0]._openid', res.result.data[0]._openid)
                  this.setData({
                     searchOwnerId: res.result.data[0]._openid
                  })
                  console.log('res.result.data[0]._openid', res.result.data[0]._openid)
                  db.collection('users').where({
                     _openid: res.result.data[0]._openid
                  }).get({
                     success: res2 => {
                        console.log('res2', res2)
                        if (res2.data[0]._openid == wx.getStorageSync('openid')) {
                           wx.showToast({
                              title: '查找失败，该失主是您自己！',
                              icon: 'none',
                              duration: 10000
                           })
                        } else {
                           console.log('searchOw', res2)
                           this.setData({
                              userList: res2.data
                           })
                        }
                        // console.log('[数据库] [查询记录] 成功: ', res)
                     },
                     fail: err => {
                        wx.showToast({
                           icon: 'none',
                           title: '查询记录失败'
                        })
                        console.error('[数据库] [查询记录] 失败：', err)
                     }
                  })
               }
            })
            .catch(err => {
               console.log('err', err)
            })
      } 
      //身份证
      else if (options.idid != undefined) {
         wx.cloud.callFunction({
               name: 'searchOwner',
               data: {
                  idid: options.idid
               }
            })
            .then(res => {
               console.log('cloud-search', res)
               if (res.result) {
                  // console.log('res.result.data[0]._openid', res.result.data[0]._openid)
                  this.setData({
                     searchOwnerId: res.result.data[0]._openid
                  })
                  console.log('res.result.data[0]._openid', res.result.data[0]._openid)
                  db.collection('users').where({
                     _openid: res.result.data[0]._openid
                  }).get({
                     success: res2 => {
                        console.log('res2', res2)
                        if (res2.data[0]._openid == wx.getStorageSync('openid')) {
                           wx.showToast({
                              title: '查找失败，该失主是您自己！',
                              icon: 'none',
                              duration: 10000
                           })
                        } else {
                           console.log('searchOw', res2)
                           this.setData({
                              userList: res2.data
                           })
                        }
                        // console.log('[数据库] [查询记录] 成功: ', res)
                     },
                     fail: err => {
                        wx.showToast({
                           icon: 'none',
                           title: '查询记录失败'
                        })
                        console.error('[数据库] [查询记录] 失败：', err)
                     }
                  })
               }
            })
            .catch(err => {
               console.log('err', err)
            })
      } 
      //驾驶证
      else if (options.carid != undefined) {
         wx.cloud.callFunction({
               name: 'searchOwner',
               data: {
                  carnum: options.carid
               }
            })
            .then(res => {
               console.log('cloud-search', res)
               if (res.result) {
                  // console.log('res.result.data[0]._openid', res.result.data[0]._openid)
                  this.setData({
                     searchOwnerId: res.result.data[0]._openid
                  })
                  console.log('res.result.data[0]._openid', res.result.data[0]._openid)
                  db.collection('users').where({
                     _openid: res.result.data[0]._openid
                  }).get({
                     success: res2 => {
                        console.log('res2', res2)
                        if (res2.data[0]._openid == wx.getStorageSync('openid')) {
                           wx.showToast({
                              title: '查找失败，该失主是您自己！',
                              icon: 'none',
                              duration: 10000
                           })
                        } else {
                           console.log('searchOw', res2)
                           this.setData({
                              userList: res2.data
                           })
                        }
                        // console.log('[数据库] [查询记录] 成功: ', res)
                     },
                     fail: err => {
                        wx.showToast({
                           icon: 'none',
                           title: '查询记录失败'
                        })
                        console.error('[数据库] [查询记录] 失败：', err)
                     }
                  })
               }
            })
            .catch(err => {
               console.log('err', err)
            })
      } 

      else {
         wx.showToast({
            title: '未找到失主',
            icon: 'none',
            duration: 2000
         })
      }

     
   },

   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   async onReady() {
      // 获取用户openid
      const {
         result
      } = await wx.cloud.callFunction({
         name: 'login'
      })

      this.setData({
         myId: result.openid
      })
   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {
      const db = wx.cloud.database()
      // 查询当前用户所有的 counters
      console.log('searchOwnerId', this.data.searchOwnerId)
      // db.collection('users').where({
      //    _openid: this.data.searchOwnerId
      // }).get({
      //    success: res => {
      //       if (res.data._openid == wx.getStorageSync('openid')) {
      //          wx.showToast({
      //             title: '查找失败，该失主是您自己！',
      //             icon: 'none',
      //             duration: 2000
      //          })
      //       } else {
      //          console.log('searchOw', res)
      //          this.setData({
      //             userList: res.data
      //          })
      //       }
      //       // console.log('[数据库] [查询记录] 成功: ', res)
      //    },
      //    fail: err => {
      //       wx.showToast({
      //          icon: 'none',
      //          title: '查询记录失败'
      //       })
      //       console.error('[数据库] [查询记录] 失败：', err)
      //    }
      // })

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