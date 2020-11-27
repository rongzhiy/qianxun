const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
   
    list: [{
      title: '身份证',
      img: 'https://786c-xly-zjauh-1301501296.tcb.qcloud.la/pai/bg14.png',
      url: '/idcard/idcard'
    },
      {  
        title: '银行卡',
        img: 'https://786c-xly-zjauh-1301501296.tcb.qcloud.la/pai/bg13.png',
        url: '/bankcard/bankcard'
      },
      {
        title: '校园卡',
        img: 'https://786c-xly-zjauh-1301501296.tcb.qcloud.la/pai/bg15.png',
        url: '/studentcard/studentcard'
      },
      {
        title: '驾驶证',
        img: 'https://786c-xly-zjauh-1301501296.tcb.qcloud.la/pai/bg16.png',
        url: '/carcard/carcard'     
    },
    {
      title: '其他',
      img: 'https://786c-xly-zjauh-1301501296.tcb.qcloud.la/pai/bg17.png',
      url: '/else/else'
  }
    ]
  },
  methods: {
    toChild(e) {
      wx.navigateTo({
        url: '/pages/pai' + e.currentTarget.dataset.url
      })
    },
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

});