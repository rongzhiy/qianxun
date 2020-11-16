// pages/photo/photo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur:0,
    swiperTitle:"最新消息",
    swiperList: [],
    articleLisst:[],
    navList:["丢失分类","技能分享"],
    iconList: [
      {
      name : '校园卡', image:"../../image/grid/school.png"
    }, {
      name : '身份证',image:"../../image/grid/idcard.png"
    }, {
      name : '银行卡',image:"../../image/grid/bankcard.png"
    },{
      name : '驾驶证', image:"../../image/grid/carcard.png"
    }, {
      name : '生活用品',image:"../../image/grid/life.png"
    }, {
      name : '其他',image:"../../image/grid/else.png"
    },],
  },
  getitem(e){
   this.setData({
     TabCur:e.detail.TabCur
   })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:"getarticle",
      data:{
        status:1
      },
      complete:res=>{
        // console.log(res.result.data)
        this.setData({
          swiperList:res.result.data
        })
      }
    })
  },



  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/pages/pai/pai'
    }
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
    wx.cloud.callFunction({
      name:"getarticle",
      data:{
        status:0
      },
      complete:res=>{
        this.setData({
          articleList:res.result.data
        })
        
      }
    })
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      console.log("触底啦~")  //触底事件
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
      title:'这个小程序牛啊！',
      query:'我是携带的参数，需要好好设置这参数，不然会出错!!'
    }
  }

})