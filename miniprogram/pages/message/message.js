// miniprogram/pages/list/list.js
const db = wx.cloud.database()
const _ = db.command
const usersCollection = db.collection('users')
const app = getApp()

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
      .then (res => {
         console.log("getchats", res)
         arraypro = res.result.data
      })
      arraypro.sort((x, y) => x.sendTimeTs - y.sendTimeTs)
      console.log('arrpro', arraypro)

      var userHere = this.data.userList
      // console.log('userHere', userHere)
      var myidindex = -1
      for (var index = 0; index < userHere.length; index++) { //遍历用户列表
         userHere[index].unread = 0
         if (userHere[index]._openid == option) {
            console.log("idindex", index)
            myidindex = index
         } else {
            for (var jjj = 0; jjj < arraypro.length; jjj++) {
               //获得最新消息信息
               if (arraypro[jjj]._openid == userHere[index]._openid || arraypro[jjj].receiveId == userHere[index]._openid) {
                  userHere[index].lastMsg = arraypro[jjj].textContent
                  userHere[index].lastTime = arraypro[jjj].sendTime
                  userHere[index].lastTimeTs = arraypro[jjj].sendTimeTs
               }
               //获得未读
               if (arraypro[jjj]._openid == userHere[index]._openid) {
                  if (arraypro[jjj].readFlag == false)
                     userHere[index].unread++
               }
            }
         }
      }      
      // console.log('uerHere1', userHere)
      if (myidindex > -1)
         userHere.splice(myidindex, 1)

      var shutLoc = 0
      for (let kkk = 0; kkk < userHere.length; kkk++) {
         if (userHere[kkk].lastMsg == undefined || userHere[kkk].lastMsg == '') {
            userHere.splice(kkk-shutLoc, 1)
            shutLoc++
         }
      }
      console.log('uerHere2', userHere)
      userHere.sort((x,y) => y.lastTimeTs - x.lastTimeTs)

      this.setData({
         msgList: userHere
      })

      
   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {
      const db = wx.cloud.database()
      
      if (wx.getStorageSync('openid'))          //登录判断
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
      db.collection('users').where({}).get({
         success: res => {
            this.setData({
               userList: res.data
            })
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
   onPullDownRefresh: function () {
      // console.log('pullDown', app.globalData)
      console.log('pullDownstorage', wx.getStorageSync('userInfo'))
      this.hanleListInfo(wx.getStorageSync('openid'))
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