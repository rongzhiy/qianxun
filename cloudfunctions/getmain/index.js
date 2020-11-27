// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
   const wxContext = cloud.getWXContext()
   console.log('event', event)
   try {
      //银行卡
      if (event.yhk) {
         return await db.collection('found').where({
            tag: 'bankcard'
         }).get()
      } 
      //身份证
      else if (event.sfz) {
         return await db.collection('found').where({
            tag: 'idcard'
         }).get()
      }
      //校园卡
      else if (event.xyk) {
         return await db.collection('found').where({
            tag: 'studentcard'
         }).get()
      }
      //驾驶证
      else if (event.jsz) {
         return await db.collection('found').where({
            tag: 'carcard'
         }).get()
      }
      else if (event.shyp){
         return await db.collection('found').where({
            tag: '生活用品'
         }).get()
      }
      else if (event.else){
         return await db.collection('found').where({
            tag: '其他'
         }).get()
      }
   } catch (err) {
      console.log('err', err)
   }
   
}