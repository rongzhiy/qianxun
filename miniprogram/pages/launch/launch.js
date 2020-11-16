Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageUrl:'../../image/grid/start.png'
  },

  // /**
  //  * 生命周期函数--监听页面加载
  //  */
  // onLoad: function (options) {
  //   var url = "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1";
  //   this.getBiYingPhoto(url);
  // },
  // /**
  //  * 获取必应首图
  //  */
  // getBiYingPhoto:function(url){
  //   var that = this ;
  //   wx.request({
  //     url: url,
  //     method:'GET',
  //     header:{
  //       "Content-Type": "json"
  //     },
  //     success:function(res){
  //       that.processBiYingPhoto(res.data.images[0].url);
  //     },
  //     fail:function(error){
  //       console.log('错误信息是：'+error);
  //     }
  //   })
  // },
  // /**
  //   * 处理必应的图片
  //   **/
  // processBiYingPhoto: function (photoImageUrl) {
  //   var imageurl = 'https://www.bing.com' + photoImageUrl;
  //   console.log(imageurl);
  //   this.setData({
  //     imageUrl:imageurl
  //   });
  // },
  /**
   * 点击进入
   */
  onBindTap:function(){
    wx.switchTab({
      url: '../personal/personal',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onPullDownRefresh: function () {
    // console.log('这是下拉刷新控制台输出的内容：其实就是跟查询数据库内容一样的功能，后期完善');
    wx.stopPullDownRefresh()
},

})