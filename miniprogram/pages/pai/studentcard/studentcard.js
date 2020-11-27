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
    }, ],
    num: 0,
    bigImg: 'https://786c-xly-zjauh-1301501296.tcb.qcloud.la/ocr/studentcarddemo.png?sign=6bfeb5790db45100165ca3d389aa4d70&t=1604993904'
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
        //   wx.hideLoading({
        //     success: (res) => {
        //       wx.showToast({
        //         title: '若识别失败或信息不准确，请手动输入',
        //         icon: 'none'
        //       })
        //       return
        //     },
        //   });
        // }, 15000);
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
        // }, 12000);
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
          stunum: 1
        }
      }).then(res => {
        console.log("日志", res)
        let result = res.result.words_result;
        if (result.length > 0) {
          let arr = '';
          for (let i = 0; i < result.length; i++) {
            arr += result[i].words
          }
          console.log('arr', arr)
          // this.setData({
          //   words_result: arr
          // })
          try {
            that.setData({
              studentcardName: res.result.words_result[2].words.slice(3),
              studentcardXueyuan: res.result.words_result[3].words.slice(3),
              studentcardID: res.result.words_result[4].words.slice(3),
            })
            wx.hideLoading();
            wx.showToast({
              title: '成功,可修改！',
              icon: 'success',
              duration: 2000
            })
          } catch (error) {
            wx.hideLoading();
            wx.showToast({
              title: '识别失败,需手动输入',
              icon: 'none',
              duration: 2000
            })
          }

        } else { //未识别出结果
          this.setData({
            words_result: ''
          })
          wx.hideLoading();
          wx.showToast({
            title: '识别失败，可手动输入',
            icon: 'none'
          })
        }

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
    var that = this
    that.getBaiduToken().then(res => {
      console.log(res)
      //获取token
      const token = res.data.access_token
      console.log("这是获取到的token", token)
      const detectUrl = `https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=${token}` // baiduToken是已经获取的access_Token      
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
          console.log('getimg res', res)
          wx.hideLoading()
          try {
            that.setData({
              studentcardName: res.data.words_result[2].words.slice(3),
              studentcardXueyuan: res.data.words_result[3].words.slice(3),
              studentcardID: res.data.words_result[4].words.slice(3),
            })

            wx.showToast({
              title: '识别成功',
              icon: 'success',
              duration: 2000
            })

          } catch (error) {
            wx.showToast({
              title: '识别失败,需手动输入',
              icon: 'none',
              duration: 2000
            })
          }

          // //把识别记录添加到数据库found中
          // foundCollection.where({
          //   _openid: wx.getStorageSync('openid'),
          //   studentcardID: that.data.studentcardID
          // }).get().then(res2 => {
          //   if (res2.data == '') {
          //     foundCollection.add({
          //       data: {
          //         time: new Date(),
          //         tag: 'studentcard',
          //         studentcardName: res.data.words_result[2].words.slice(3),
          //         studentcardXueyuan: res.data.words_result[3].words.slice(3),
          //         studentcardID: res.data.words_result[4].words.slice(3)
          //       }
          //     }).then(res => {
          //       console.log('添加成功')

          //     })
          //   } else {
          //     console.log('存在')
          //   }
          // })
          // setTimeout(function () {
          //   wx.hideLoading()
          // }, 1000)


          //把识别记录添加到数据库found中
          //  foundCollection.where({
          //     _openid: wx.getStorageSync('openid'),
          //     idcardId: that.data.idcardId
          //  }).get().then(res2 => {
          //     if (res2.data == '') {
          //        foundCollection.add({
          //           data: {
          //              time: new Date(),
          //              tag: 'idcard',
          //              idcardName: res.data.words_result.姓名.words,
          //              idcardId: res.data.words_result.公民身份号码.words,
          //              idcardAddr: res.data.words_result.住址.words,
          //              idcardBirth: res.data.words_result.出生.words,
          //              idcardGender: res.data.words_result.性别.words
          //           }
          //        }).then(res => {
          //           console.log('添加成功')
          //        })
          //     } else {
          //        console.log('存在')
          //     }
          //  })
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

  // studentcard() {
  //   let that = this
  //   //选择图片
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['compressed'],
  //     sourceType: ['album', 'camera'],
  //     success(res) {
  //       // tempFilePath可以作为img标签的src属性显示图片
  //       const tempFilePaths = res.tempFilePaths
  //       console.log("临时链接", tempFilePaths)
  //       that.uploadFile(tempFilePaths[0])
  //       wx.showLoading({
  //         title: '正在识别...',
  //       })
  //     }
  //   });
  // },



  // //上传图片到云存储
  // uploadFile(tempFile) {
  //   let that = this;
  //   let filePath = tempFile;
  //   const name = Math.random.tempFile;
  //   const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
  //   wx.cloud.uploadFile({
  //     cloudPath, // 上传至云端的路径
  //     filePath, // 小程序临时文件路径
  //     success: res => {
  //       // 返回文件 ID  
  //       console.log(res.fileID)
  //       that.getImgUrl(res.fileID)

  //     },
  //     fail: console.error
  //   })
  // },
  // //获取图片url
  // getImgUrl(fileid) {
  //   let that = this
  //   wx.cloud.getTempFileURL({
  //     fileList: [fileid],
  //     success: res => {
  //       let tempUrl = res.fileList[0].tempFileURL
  //       console.log("获取图片url成功", tempUrl)
  //       that.shibie(tempUrl)
  //     },
  //     fail: err => {
  //       // handle error
  //       console.log("获取图片url失败", err)
  //     }
  //   })

  // },

  // //调用云函数识别
  // shibie(tempUrl) {
  //   let that = this
  //   wx.cloud.callFunction({
  //     name: "studentcard",
  //     data: {
  //       imgUUU: tempUrl
  //     },
  //     success(res) {
  //       console.log("识别成功", res.result)
  //       that.setData({
  //         studentcardName: res.result.items[3].text.slice(3, 10),
  //         studentcardXueyuan: res.result.items[4].text.slice(3, 7),
  //         studentcardID: res.result.items[5].text.slice(3, 18)
  //       })

  //       //把识别记录添加到数据库found中
  //       foundCollection.where({
  //         _openid: wx.getStorageSync('openid'),
  //         studentcardID: that.data.studentcardID
  //       }).get().then(res2 => {
  //         if (res2.data == '') {
  //           foundCollection.add({
  //             data: {
  //               time: new Date(),
  //               tag: 'studentcard',
  //               studentcardName: res.result.items[3].text.slice(3, 10),
  //               studentcardXueyuan: res.result.items[4].text.slice(3, 7),
  //               studentcardID: res.result.items[5].text.slice(3, 18)
  //             }
  //           }).then(res => {
  //             console.log('添加成功')

  //           })
  //         } else {
  //           console.log('存在')
  //         }
  //       })
  //       setTimeout(function () {
  //         wx.hideLoading()
  //       }, 1000)

  //       wx.showToast({
  //         title: '识别成功',
  //         icon: 'success',
  //         duration: 2000
  //       })

  //     },
  //     fail(res) {
  //       console.log("识别失败", res)
  //     }
  //   })
  // },

  //查找失主
  searchOwner: function (e) {
    console.log('this.data.bankcardNumber', this.data.studentcardID)
    console.log('srch e', e)
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
    let that = this
    var stuid = e.detail.value.studentcardID
    if (e.detail.value.studentcardXueyuan && e.detail.value.studentcardName) {
      if (stuid.length >= 5 && /^[0-9]*$/.test(stuid)) {
        //把识别记录添加到数据库found中
        foundCollection.where({
          _openid: wx.getStorageSync('openid'),
          studentcardID: that.data.studentcardID
        }).get().then(res2 => {
          if (res2.data == '') {
            foundCollection.add({
              data: {
                time: new Date(),
                tag: 'studentcard',
                studentcardName: e.detail.value.studentcardName,
                studentcardXueyuan: e.detail.value.studentcardXueyuan,
                studentcardID: e.detail.value.studentcardID
              }
            }).then(res => {
              console.log('添加成功')

            })
          } else {
            console.log('存在')
          }
        })

        wx.navigateTo({
          url: '../../chat_list/chat_list?stuid=' + stuid,
        })
      } else {
        wx.showToast({
          title: '学号应全为数字且5位以上',
          icon: 'none',
          duration: 2000
        })
      }
    } else {
      wx.showToast({
        title: '未识别或信息填写不全',
        icon: 'none',
        duration: 2000
      })
    }
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