// miniprogram/pages/list/list.js
const db = wx.cloud.database()
const _ = db.command
const usersCollection = db.collection('users')
const app = getApp()
const Encrypt = require('../../utils/jsencrypt.min.js')

Page({

   /**
    * 页面的初始数据
    */
   data: {
      userList: [],
      myId: '',
      msgList: []
   },


   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {

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

      // this.hanleListInfo(result.openid)
      // this.onShow(result.openid)
   },

   onDecrypt: function (arg) {
      var privateKey = 'MIICXAIBAAKBgQCS1/LnFzny4VdxqNsY4DFuoqLPK3e0k2issswimlJ8VW4nwo6nM37oqKL/V68Izd5m8qdjTo5aJ6icB/2zTFQGtcurLo4i7EDWU5bbiM8OfVXCY0kbtO65iRXUYMAfW2XVFicZTPS7xjmz03qE2KwSK5qos6/9Zf3wYKYnEjM73wIDAQABAoGAROFKHe8trgnY4EZSG72SQnDEiQQ9PvWEfLnT+olEFvFl3f2rt692oMD10Gu7fZg/8i9xqCoBqTWAKEyxSykLIm+O2X/RS9VUHefKllXel0oEmHJ3zngF67wnfQOecxVosfmlGE2zdkT4kfy87JYoLIKZhTVdkSpVsbjyQtJqC7kCQQCgzpUtMuRR1P+4LhtWEb0BAu0wg+TUTKQt+APoh2VsNYTVOlEC8AgaJDZ4WBgO4zzIFiPiD0zArPxx4kWSGmJ5AkEA6cVJevooNaJE45Reg0Rhe1vJAI2roWlhGR5+6+/OCLB7q57Zj+Rqlh8ZlwSvSn8Vch+0F0SxEB4d/EOhgZa7FwJBAI7EemsjmNQSYGrb/IcgvoYMXBtLrjjSRp1NaeLjeqdkqKdK3CvYgcj7x6R2yf1FwGwARCFq5gDWVFajxpKdfDkCQGOOF1r+Cf29W2UoHI/+oR0t244Wx074V9eguyCzgaUFs8VE4xZ6ikHggL9lyVkKghGWGtYF9PoOOWrjSnarwIUCQHupOYw+KtqRXT3Bo1wsJBO8ZYKTzPHUokXvZ8ZRTXlAaQtCwnCetfYb67knT4Esqnt4/v9n1/kWVxmlNiCWM4w='
      // 解密
      const decryptor = new Encrypt.JSEncrypt();
      decryptor.setPrivateKey(privateKey)
      if (arg && arg != null)
         return decryptor.decrypt(arg)
      return ags
   },

   async hanleListInfo(option) { //处理函数，用于列表的显示
      //此处为小程序端的查询数据操作，受限于20条，暂时作废
      //定义每次获取的条数
      // const MAX_LIMIT = 20;
      // //先取出集合的总数
      // const countResult = await db.collection('chat_info').where(_.or([{
      //       receiveId: option
      //    },
      //    {
      //       _openid: option
      //    }
      // ])).count()
      // // console.log('count', countResult)
      // const total = countResult.total
      // const batchTimes = Math.ceil(total / MAX_LIMIT) //计算需分几次取      
      // const arraypro = [] // 承载所有读操作的 promise 的数组
      // //初次循环获取云端数据库的分次数的promise数组
      // for (let i = 0; i < batchTimes; i++) {
      //    const promise = await db.collection('chat_info').where(_.or([{
      //          receiveId: option
      //       },
      //       {
      //          _openid: option
      //       }
      //    ])).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
      //    //二次循环根据获取的promise数组的数据长度获取全部数据push到arraypro数组中
      //    for (let j = 0; j < promise.data.length; j++) {
      //       arraypro.push(promise.data[j])
      //    }
      // }
      // arraypro.sort((x, y) => x.sendTimeTs - y.sendTimeTs)
      // console.log('arrpro', arraypro)

      var arraypro = []
      await wx.cloud.callFunction({
            name: 'getchats',
            data: {
               option: option
            }
         })
         .then(res => {
            console.log("getchats", res)
            arraypro = res.result.data
         })
      arraypro.sort((x, y) => x.sendTimeTs - y.sendTimeTs)
      // this.onDecrypt(arraypro)
      console.log('arrpro', arraypro)

      //解密准备

      var userHere = this.data.userList
      console.log('userHere', userHere)

      var myidindex = -1
      for (var index = 0; index < userHere.length; index++) { //遍历用户列表
         userHere[index].unread = 0
         if (userHere[index]._openid == option) {
            console.log("idindex", index)
            myidindex = index
         } else {
            for (var jjj = 0; jjj < arraypro.length; jjj++) {
               //获得最新消息信息
               if ((arraypro[jjj]._openid == userHere[index]._openid && arraypro[jjj].receiveId == option) || (arraypro[jjj].receiveId == userHere[index]._openid && arraypro[jjj]._openid == option)) {
                  userHere[index].lastMsg = this.onDecrypt(arraypro[jjj].textContent)
                  userHere[index].lastTime = arraypro[jjj].sendTime
                  userHere[index].lastTimeTs = arraypro[jjj].sendTimeTs
               }
               //获得未读
               if (arraypro[jjj]._openid == userHere[index]._openid && arraypro[jjj].receiveId == option) {
                  if (arraypro[jjj].readFlag == false)
                     userHere[index].unread++
               }
            }
         }
      }
      if (myidindex > -1)
         userHere.splice(myidindex, 1)
      console.log('uerHere1', userHere)

      var shutLoc = 0
      for (let kkk = 0; kkk < userHere.length; kkk++) {
         if (userHere[kkk].lastMsg == undefined || userHere[kkk].lastMsg == '' || userHere[kkk].lastMsg == null) {
            // console.log('kkk', kkk)
            // console.log('shutLoc', shutLoc)
            // console.log('delete', userHere[kkk - shutLoc])
            userHere.splice(kkk--, 1)
            // shutLoc++
         }
         // if (kkk == userHere.length - 1)
         //    break
         console.log('newlist', userHere)
      }
      console.log('uerHere2', userHere)
      userHere.sort((x, y) => y.lastTimeTs - x.lastTimeTs)

      this.setData({
         msgList: userHere
      })


   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {
      const db = wx.cloud.database()

      if (wx.getStorageSync('openid')) //登录判断
         this.hanleListInfo(wx.getStorageSync('openid'))
      else {
         wx.showToast({
            title: '请先登录...',
            icon: 'loading',
            duration: 5000
         })
         wx.switchTab({
            url: '../personal/personal',
         })
      }

      // 查询当前用户所有的 counters
      db.collection('users').get({
         success: res => {
            this.setData({
               userList: res.data
            })
            console.log('[数据库] [查询记录] 成功: ', res)
            console.log('[数据库] [查询记录] 成功: ', res.data[3])
            console.log('[数据库] [查询记录] 成功: ', res.data[4])
         },
         fail: err => {
            wx.showToast({
               icon: 'none',
               title: '查询记录失败'
            })
            console.error('[数据库] [查询记录] 失败：', err)
         }
      })

   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function () {
      console.log('message onHide')
   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function () {

   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   // onPullDownRefresh: function () {
   //    // console.log('pullDown', app.globalData)
   //    console.log('pullDownstorage', wx.getStorageSync('userInfo'))
   //    this.hanleListInfo(wx.getStorageSync('openid'))
   // },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function () {
      // console.log('pullDown', app.globalData)
      console.log('pullDownstorage', wx.getStorageSync('userInfo'))
      this.hanleListInfo(wx.getStorageSync('openid'))
      wx.stopPullDownRefresh()
      wx.showToast({
         title: '刷新成功',
         icon: 'none'
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