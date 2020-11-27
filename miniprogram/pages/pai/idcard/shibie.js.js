Page({
   data: {
      words: []
   },


   picToTxt() {
      let that = this
      wx.chooseImage({
         success: (res) => {
            //获取图片的临时路径
            const tempFilePath = res.tempFilePaths[0]
            //根据官方的要求  用base64字符编码获取图片的内容
            wx.getFileSystemManager().readFile({
               filePath: tempFilePath,
               encoding: 'base64',
               success: function (res) {
                  //调用方法
                  that.getImgInfo(res.data)
               },
            })
         },
      })
   },
   //根据图片的内容调用API获取图片文字
   getImgInfo: function (imageData) {
      wx.showLoading({
         title: '识别中...',
      })
      var that = this
      that.getBaiduToken().then(res => {
         console.log(res)
         //获取token
         const token = res.data.access_token
         console.log("这是获取到的token", token)
         const detectUrl = `https://aip.baidubce.com/rest/2.0/ocr/v1/bankcard?access_token=${token}` // baiduToken是已经获取的access_Token      
         // https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic
         // https://aip.baidubce.com/rest/2.0/ocr/v1/idcard
         wx.request({
            url: detectUrl,
  
            data: {
               image: imageData,
            },
            method: 'POST',
            dataType: 'json',
            header: {
               'content-type': 'application/x-www-form-urlencoded' // 必须的        
            },
            success: function (res, resolve) {
              //  let that = this
               console.log(res)
               //将 res.data.words_result数组中的内容加入到words中           
               that.setData({
                  words: res.data.words_result
               })
               //   console.log('识别后： ' + res.data)
               wx.hideLoading()
  
               that.setData({
                  idcardName: res.data.words_result.姓名.words,
                  idcardId: res.data.words_result.公民身份号码.words,
                  idcardAddr: res.data.words_result.住址.words,
                  idcardBirth: res.data.words_result.出生.words,
                  idcardGender: res.data.words_result.性别.words
               })
               wx.showToast({
                  title: '识别成功',
                  icon: 'success',
                  duration: 2000
               })
  
               //把识别记录添加到数据库found中
               foundCollection.where({
                  _openid: wx.getStorageSync('openid'),
                  idcardId: that.data.idcardId
               }).get().then(res2 => {
                  if (res2.data == '') {
                     foundCollection.add({
                        data: {
                           time: new Date(),
                           tag: 'idcard',
                           idcardName: res.data.words_result.姓名.words,
                           idcardId: res.data.words_result.公民身份号码.words,
                           idcardAddr: res.data.words_result.住址.words,
                           idcardBirth: res.data.words_result.出生.words,
                           idcardGender: res.data.words_result.性别.words
                        }
                     }).then(res => {
                        console.log('添加成功')
                     })
                  } else {
                     console.log('存在')
                  }
               })
            },
            fail: function (res, reject) {
               console.log('get word fail：', res.data);
               wx.hideLoading()
            },
            complete: function () {
               wx.hideLoading()
            }
         })
      })
   },
   // 获取百度access_token  
   getBaiduToken: function () {
      return new Promise(resolve => {
         var APIKEY = "KzFHkunOL0yuUaX0f05rMohB"
         var SECKEY = "OvPcBorH2qWV7acMxGeg73bsIDcbjBfn"
         var tokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${APIKEY}&client_secret=${SECKEY}`
         var that = this;
         wx.request({
            url: tokenUrl,
            method: 'POST',
            dataType: 'json',
            header: {
               'content-type': 'application/json; charset-UTF-8'
            },
            success: function (res) {
               console.log("[BaiduToken获取成功]", res);
               return resolve(res)
            },
            fail: function (res) {
               console.log("[BaiduToken获取失败]", res);
               return resolve(res)
            }
         })
      })
   },

})