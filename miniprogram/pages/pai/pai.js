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
      url: '/indexes/indexes'
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

});