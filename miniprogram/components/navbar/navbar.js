// miniprogram/components/navbar/navbar.js
Component({
  options:{
    addGlobalClass:true
  },
  /**
   * 组件的属性列表
   */
  properties:{
    navList:Array,
  },
  /**
   * 页面的初始数据
   */
  data: {
      TabCur: 0,
      scrollLeft:0
  },
/**
 * 组件的方法列表
 */
  methods:{
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id-1)*60
      })
      this.triggerEvent ("getnavitem", {TabCur:e.currentTarget.dataset.id},{})
    }
  }

})