// pages/xun/xun.js
Page({
  data: {
    disabled:true,
   
  },

  bankCard(){
    let that = this;
    wx.cloud.callFunction({
      name: "tupianshibie",
      data: {
        imgUUU:"https://786c-xly-zjauh-1301501296.tcb.qcloud.la/ocr/bankcard.jpg?sign=a3b26f80b11e810821e031da4d3d5512&t=1589641234"
      },
      success(res){
        console.log("识别成功", res)
        that.setData({
          bankcardNumber : res.result.number
        })
      },
      fail(res){
        console.log("识别失败",res)
      }
    })


  },

  idCard(){
    let that = this
    //选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log("临时链接",tempFilePaths)
        that.uploadFile(tempFilePaths[0])
      }
    })
  },
    //上传图片到云存储
    uploadFile(tempFile){
      let that = this;
      let filePath = tempFile;
      const name = Math.random.tempFile;
      const cloudPath = name+filePath.match(/\.[^.]+?$/)[0]
      wx.cloud.uploadFile({
        cloudPath, // 上传至云端的路径
        filePath, // 小程序临时文件路径
        success: res => {
          // 返回文件 ID  
          console.log(res.fileID)
          that.getImgUrl(res.fileID)
        },
        fail: console.error
      })
    },
    
    //获取图片url
    getImgUrl(fileid){
      let that = this
      wx.cloud.getTempFileURL({
        fileList: [fileid],
        success: res => {
         let tempUrl = res.fileList[0].tempFileURL
          console.log("获取图片url成功",tempUrl)
          that.shibie(tempUrl)
        },
        fail: err => {
          // handle error
          console.log("获取图片url失败",err)
        }
      })
    },

    //调用云函数识别身份证
    shibie(tempUrl){
      wx.cloud.callFunction({
        name: "idcard",
        data:{
          imgIdcard: tempUrl   
        },
        success(res){
          console.log("识别成功", res)
        },
        fail(res){
          console.log("识别失败", res)
        }
      })
    }



  
})