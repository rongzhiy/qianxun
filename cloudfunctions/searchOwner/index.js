// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const searchCollection = db.collection('baseinfo')
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
   const wxContext = cloud.getWXContext()
   console.log('event', event)
   try {
      //银行卡
      if (event.banknum) {
         var rest = await searchCollection.where({
            bankcard: event.banknum
         }).count()

         if (rest) {
            return await searchCollection.where({
               bankcard: event.banknum
            }).get()
         } else {
            return 0
         }
      }
    //校园卡
      else if (event.stunum) {
         var rest = await searchCollection.where({
            xuehao: event.stunum
         }).count()

         if (rest) {
            return await searchCollection.where({
               xuehao: event.stunum
            }).get()
         } else {
            return 0
         }
      }
      //身份证
      else if (event.idid) {
         var rest = await searchCollection.where({
            idcard: event.idid
         }).count()

         if (rest) {
            return await searchCollection.where({
               idcard: event.idid
            }).get()
         } else {
            return 0
         }
      }
      //驾驶证
      else if (event.carnum) {
         var rest = await searchCollection.where({
            carcard: event.carnum
         }).count()

         if (rest) {
            return await searchCollection.where({
               carcard: event.carnum
            }).get()
         } else {
            return 0
         }
      }

   } catch (err) {
      console.log("err", err)
   }


   // return rest
}