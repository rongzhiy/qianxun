const app = getApp();
const db = wx.cloud.database()
const util = require('../../../utils/util.js');
const foundCollection = db.collection('found')


Page({
  data: {
    describe: '',
    addr: '',
    shizhu: '',
    remark: '',
    phone: '',
    tag: '生活用品',
    index: null,
    bigimg: '../../../image/icon/pai2.png',
    imgUrl: ''
  },

 
  ChooseImage() {
    let that = this
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        if (this.data.bigimg != 0) {
          this.setData({
            bigimg: res.tempFilePaths
          })
          console.log("获取到临时链接:", this.data.bigimg)
          const tempFilePaths = res.tempFilePaths
          this.uploadFile(tempFilePaths[0])

        } else {
          this.setData({
            bigimg: res.tempFilePaths
          })
        }
        wx.showLoading({
          title: '图片上传中',
          icon: 'loading'
        })
      }
    });
  },

  radioChange(e) {
    let that = this
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    that.setData({
      tag: e.detail.value,
    })
    console.log("tag是", this.data.tag)
  },
  //上传图片到云存储
uploadFile(tempFile) {
    let that = this;
    let filePath = tempFile;
    const name = Math.random.tempFile;
    var str = Math.random().toString(36).slice(-8);
    const cloudPath = "tupian/"+str+ filePath.match(/\.[^.]+?$/)[0]

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
  getImgUrl(fileid) {
    let that = this
    wx.cloud.getTempFileURL({
      fileList: [fileid],
      success: res => {
        let tempUrl = res.fileList[0].tempFileURL
        console.log("获取图片url成功", tempUrl)
        that.setData({
          imgUrl: tempUrl
        })
        setTimeout(function () {
          wx.hideLoading()
          
        }, 1000)

        wx.showToast({
          title: '图片上传成功',
          icon: 'none',
          duration: 4000
        })

      },
      fail: err => {
        // handle error
        console.log("获取图片url失败", err)
        wx.showModal({
          title: '温馨提示',
          content: '图片识别失败，请重新上传图片~',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.switchTab({
                url: '../../pai/else/else',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
              wx.switchTab({
                url: '../../pai/else/else',
              })
            }
          }
        })
        

      }
    })

  },
 


  // 提交表单
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let {
      describe,
      addr,
      shizhu,
      remark,
      phone
    } = e.detail.value;
    if (describe == '' || addr == '' || this.data.bigimg == '../../../image/icon/pai2.png') {
      wx.showToast({
        title: '请至少填写物品描述、拾取地点和图片上传',
        icon: 'none',
        duration: 2000
      })
    } else {

      foundCollection.add({
        data: {
          describe: describe,
          addr: addr,
          shizhu: shizhu,
          remark: remark,
          phone: phone,
          tag: this.data.tag,
          time: util.formatTime(new Date()),
          img: this.data.imgUrl
        }
      }).then(res => {
        wx.showToast({
          title: '保存成功',
          duration: 2000
        })
      })
    };
  },

})