const app = getApp();
const db = wx.cloud.database()
const baseinfoCollection = db.collection('baseinfo')

Page({
  data: {
    picker: ['云南大学', '云昆工', '云师大','云民大'],
    region: ['云南省', '昆明市', '呈贡区'],
    modalName: null,
    textareaBValue: null, 
    name:'',
    weixinhao:'',
    qqhao:'',
    phonenumber:'',
    idcard:'',
    bankcard:'',
    xuehao:'',
    beizhu:'',
    index:0
    
  },
  PickerChange(e) {
    console.log(e);
    this.setData({ 
      index: e.detail.value,   
    })
  },

  RegionChange: function(e) {
    // console.log(e);
    this.setData({
      region: e.detail.value
    }) 
    console.log(this.data.region);
  },

  textareaInput(e) {
    this.setData({
      beizhu: e.detail.value
    })
  },

  formSubmit: function(e){
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let {bankcard,beizhu,idcard,name,phonenumber,qqhao,weixinhao,xuehao}=e.detail.value;
    if(name == ''||phonenumber==''){
       wx.showToast({
         title: '请至少填写姓名和电话号码',
         icon:'none',
         duration:2000
       })
    }else{

      baseinfoCollection.add({
        data:{
          name:name,
          weixinhao:weixinhao,
          qqhao:qqhao,
          phonenumber:phonenumber,
          idcard:idcard,
          bankcard:bankcard,
          xuehao:xuehao,
          beizhu:beizhu,
          daxue:this.data.picker[this.data.index],
          address:this.data.region,
          time: new Date()
        }
      }).then(res=>{
      wx.showToast({
        title: '保存成功',
        duration:1000
      })
      })

    };
         
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