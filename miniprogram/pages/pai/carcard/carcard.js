// pages/xun/xun.js
const db = wx.cloud.database();
const carcardCollection = db.collection('found')
Page({
  data: {

    numList: [{
      name: '1、拍照识别'
    }, {
      name: '2、查找失主'
    }, {
      name: '3、沟通归还'
    }, ],
    num: 0,
    bigImg: 'https://786c-xly-zjauh-1301501296.tcb.qcloud.la/ocr/cardemo.jpg?sign=fa10ebd14b199b3959342bc4473a337c&t=1604719812'
  },

  carcard() {
    let that = this
    //选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log("临时链接", tempFilePaths)
        that.uploadFile(tempFilePaths[0])
      }
    });
  },



  //上传图片到云存储
  uploadFile(tempFile) {
    let that = this;
    let filePath = tempFile;
    const name = Math.random.tempFile;
    const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
    wx.cloud.uploadFile({
      cloudPath, // 上传至云端的路径
      filePath, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID  
        console.log(res.fileID)
        that.getImgUrl(res.fileID)
        // that.setData({
        //   bigImg:tempFile
        // })
      },
      fail: console.error
    })
  },
  //获取图片url
  getImgUrl(fileid) {
    let that = this
    wx.cloud.getTempFileURL({
      fileList: [fileid],
      success: res => {
        let tempUrl = res.fileList[0].tempFileURL
        console.log("获取图片url成功", tempUrl)
        that.shibie(tempUrl)

      },
      fail: err => {
        // handle error
        console.log("获取图片url失败", err)
      }
    })
    wx.showToast({
      title: '稍后，正在识别',
      icon: 'loading',
      duration: 4000
    })
  },

  //调用云函数识别
  shibie(tempUrl) {
    let that = this
    wx.cloud.callFunction({
      name: "carcard",
      data: {
        imgUUU: tempUrl
      },
      success(res) {
        console.log("识别成功", res)
        that.setData({
          carcardAddr: res.result.address,
          carcardId: res.result.idNum,
          carcardName: res.result.name,
          carcardBirth: res.result.birthDate,
          carcardJiguan: res.result.officialSeal
        })
        wx.showToast({
          title: '识别成功',
        })
        //把识别记录添加到数据库found中
        carcardCollection.where({
          _openid: wx.getStorageSync('openid'),
          carcardId: that.data.carcardId
        }).get().then(res => {
          if (res.data == '') {
            carcardCollection.add({
              data: {
                time: new Date(),
                tag: 'carcard',
                carcardAddr:that.data.carcardAddr,
                carcardId:that.data.carcardId,
                carcardName:that.data.carcardName,
                carcardBirth:that.data.carcardBirth,
                carcardJiguan:that.data.carcardJiguan
              }
            }).then(res => {
              console.log('添加成功')
            })
          } else {
            console.log('存在')
          }
        })

      },
      fail(res) {
        console.log("识别失败", res)
      }
    })
  },
  //查找失主
  searchOwner: function () {
    console.log('this.data.carcardId', this.data.carcardId)
    // if (this.data.bankcardNumber) {
    //   wx.cloud.callFunction({
    //     name: 'searchOwner',
    //     data: {
    //       banknum: this.data.bankcardNumber
    //     }
    //   })
    //   .then ( res => {
    //     console.log('cloud-search',res)
    //     if (res.result){
    //       // res.result.data.forEach(element => {
    //       //   element._openid
    //       // });
    //       console.log('res.result.data',res.result.data, typeof res.result.data)
    //       wx.navigateTo({
    //         url: '../../chat_list/chat_list?userInfo='+res.result.data,
    //       })
    //     }
    //   })
    //   .catch ( err => {
    //     console.log('err',err)
    //   })
    // } else {
    //   wx.showToast({
    //     title: '未识别银行卡号',
    //     icon: 'none',
    //     duration: 2000
    //   })
    // }

    if (this.data.carcardId) {
      wx.navigateTo({
        url: '../../chat_list/chat_list?carid=' + this.data.carcardId,
      })
    } else {
      wx.showToast({
        title: '未识别到驾驶证',
        icon: 'none',
        duration: 2000
      })
    }
  }






})