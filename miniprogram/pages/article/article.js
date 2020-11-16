// pages/article/article.js

const app =getApp();

const db = wx.cloud.database();
const _=db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comlength:0,
    disabled:true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('article').where({
      _id:options.id
    }).update({
      data:{
        view:_.inc(1)
      }
    }).then(res=>{
      console.log(res)
    })
    // console.log(options)
    if(app.globalData.userInfo){
      this.setData({
        disabled:false
      })
    }
    wx.cloud.callFunction({
      name:"getarticle",
      data:{
        id:options.id
      },
      complete:res=>{
        // console.log(res.result.data)
        const detail = res.result.data[0]
        this.setData({
          title:detail.title,
          nickname:detail.nickname,
          time:detail.time,
          image:detail.image,
          tag:detail.tag,
          content:detail.contents,
          view:detail.view,
          zan:detail.zan,
          cnumber:detail.cnumber,
          comment:detail.comments,
          comlength:detail.comments.length
        })
      }
    }),
    wx.setNavigationBarTitle({
      title: '云大千寻小程序'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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

  onPullDownRefresh: function () {
    // console.log('这是下拉刷新控制台输出的内容：其实就是跟查询数据库内容一样的功能，后期完善');
    this.onLoad();
    wx.stopPullDownRefresh()
    console.log('刷新成功')
    wx.showToast({
      title: '刷新成功',
      icon:'none'
    })
},
 /**
   * 用户点击右上角分享
   */
  onShareAppMessage:function(res){
    return {title:'云大千寻小程序'}
  },
  /**
   * 用户点击右上角分享到朋友圈
   */
  onShareTimeline:function(res){
    return{
      title:'云大千寻',
    }
  }

  
})