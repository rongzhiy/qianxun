// pages/xun/xun.js
const db = wx.cloud.database()
const foundCollection = db.collection('found')
Page({
  data: {
    numList: [{
      name: '1、拍照识别'
    }, {
      name: '2、查找失主'
    }, {
      name: '3、沟通归还'
    }],
    num: 0,
    bigImg: 'https://786c-xly-zjauh-1301501296.tcb.qcloud.la/ocr/idcarddemo.jpg?sign=d1ede2a39bdb4081519fe8f556acc813&t=1604719781'

  },

  xaingce(e) { //相册响应函数
    let tempFiles;
    let tempFilePaths;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        tempFiles = res.tempFiles[0].size;
        tempFilePaths = res.tempFilePaths[0];
        // if (tempFiles > 3000000) {//大于3m
        //   wx.showToast({
        //     title: '图片大小大于3M',
        //     icon: 'none',
        //     duration: 2000
        //   });
        //   return;
        // }
        wx.showLoading({
          title: '识别中'
        });
        this.uplaodF(tempFilePaths);
        // setTimeout(function () {
        //   wx.hideLoading();
        // }, 3000);
      }
    });
  },
  camera() { //相机响应函数
    let ctx = wx.createCameraContext();
    ctx.takePhoto({
      quality: "normal",
      success: (res) => {
        let tempFilePaths = res.tempImagePath;
        this.setData({
          camera: false
        });
        // wx.showLoading({
        //   title: '识别中'
        // });
        this.uplaodF(tempFilePaths);
        // setTimeout(function () {
        //   wx.hideLoading();
        // }, 3000);
      }
    });
  },
  uplaodF(path) {
    let result = false;
    let that = this;
    let name = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'));
    wx.cloud.uploadFile({
      cloudPath: name,
      filePath: path, // 文件路径
    }).then(res => {
      // get resource ID
      let id = res.fileID;

      // wx.showLoading({
      //   title: '识别中'
      // });
      //调用云函数识别图片
      wx.cloud.callFunction({
        name: 'baiduOcr',
        data: {
          fileID: id,
          idnum: 1
        }
      }).then(res => {
        let result = res.result.words_result;
        if (result) {
          let arr = '';
          for (let i = 0; i < result.length; i++) {
            arr += result[i].words
          }
          console.log('arr', arr)
          // this.setData({
          //   words_result: arr
          // })
          that.setData({
            idcardName: res.result.words_result.姓名.words,
            idcardId: res.result.words_result.公民身份号码.words,
            idcardAddr: res.result.words_result.住址.words,
            idcardBirth: res.result.words_result.出生.words,
            idcardGender: res.result.words_result.性别.words
          })
          wx.hideLoading();
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
                  idcardName: res.result.words_result.姓名.words,
                  idcardId: res.result.words_result.公民身份号码.words,
                  idcardAddr: res.result.words_result.住址.words,
                  idcardBirth: res.result.words_result.出生.words,
                  idcardGender: res.result.words_result.性别.words
                }
              }).then(res => {
                console.log('添加成功')
              })
            } else {
              console.log('存在')
            }
          })
        } else {  //未识别出结果
          this.setData({
            words_result: ''
          })
          wx.hideLoading();
          wx.showToast({
            title: '识别失败，可手动输入',
            icon: 'none'
          })
        }
        console.log("日志", res)
        //删除图片
        wx.cloud.deleteFile({
          fileList: [id]
        }).then(res => {
          // handle success
        }).catch(error => {
          // handle error
        })
      }).catch(err => {
        console.log(err)
      });
    }).catch(error => {

    });
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
    // setTimeout(function () {
    //   wx.hideLoading()
    // }, 2000)
    var that = this
    that.getBaiduToken().then(res => {
      console.log(res)
      //获取token
      const token = res.data.access_token
      console.log("这是获取到的token", token)
      const detectUrl = 'https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=' + token // baiduToken是已经获取的access_Token      
      // https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic
      // https://aip.baidubce.com/rest/2.0/ocr/v1/idcard
      // return new Promise(function (resolve, reject) {
      wx.request({
        url: detectUrl,
        data: {
          image: imageData,
          id_card_side: 'front'
        },
        method: 'GET',
        timeout: 9000,
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 必须的        
        },
        success: function (res) {
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
        fail: function (res) {
          console.log('get word fail：', res);
          wx.hideLoading()
          wx.showToast({
            title: '识别失败，可手动输入',
            icon: 'none'
          })
        },
        complete: function () {
          wx.hideLoading()
          console.log('complete：');
        }
      })
      // })
    })
  },
  // 获取百度access_token  
  getBaiduToken: function () {
    return new Promise(resolve => {
      var APIKEY = "KzFHkunOL0yuUaX0f05rMohB"
      var SECKEY = "OvPcBorH2qWV7acMxGeg73bsIDcbjBfn"
      var tokenUrl = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + APIKEY + '&client_secret=' + SECKEY
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

  //查找失主
  searchOwner: function (e) {
    let that = this
    console.log('this.data.idcardId11', this.data.idcardId)
    console.log('seaor', e)
    if (!/^\d{17}(\d|x)$/i.test(e.detail.value.idcardId)) { //判断身份证
      wx.showToast({
        title: '身份证号未填或错误',
        icon: 'none',
        duration: 2000
      })
      console.log('this.data.idcardId33', this.data.idcardId)
    } else {
      this.setData({
        idcardId: e.detail.value.idcardId,
      })
      console.log('this.data.idcardId22', this.data.idcardId)
      if (e.detail.value.idcardName) { //判断姓名
        foundCollection.where({
          _openid: wx.getStorageSync('openid'),
          idcardId: that.data.idcardId
        }).get().then(res2 => {
          if (res2.data == '') {
            foundCollection.add({
              data: {
                time: new Date(),
                tag: 'idcard',
                idcardName: e.detail.value.idcardName,
                idcardId: e.detail.value.idcardId,
                idcardAddr: e.detail.value.idcardAddr,
                idcardBirth: e.detail.value.idcardBirth,
                idcardGender: e.detail.value.idcardGender
              }
            }).then(res => {
              console.log('添加成功')
            })
          } else {
            console.log('存在')
          }
        })

        wx.navigateTo({
          url: '../../chat_list/chat_list?idid=' + e.detail.value.idcardId,
        })

      } else {
        wx.showToast({
          title: '请输入姓名',
          icon: 'none',
          duration: 2000
        })
      }
    }

    // if (this.data.idcardId) {

    // } else {
    //   // wx.showToast({
    //   //   title: '无身份证号或姓名',
    //   //   icon: 'none',
    //   //   duration: 2000
    //   // })
    // }
  },


  onPullDownRefresh: function () {
    // console.log('这是下拉刷新控制台输出的内容：其实就是跟查询数据库内容一样的功能，后期完善');
    this.onLoad();
    wx.stopPullDownRefresh()
    console.log('刷新成功')
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