// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
   env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
   // var result
   // const wxContext = cloud.getWXContext()
   console.log('event', event)
   try {
   return await db.collection('chat_info').where(
      _.or([{
            receiveId: event.option
         },
         {
            _openid: event.option
         }
      ])
   ).field({
      _id: false
   }).get()

   //暂时作废
   // const $ = db.command.aggregate
   // var rest
   // await db.collection('chat_info').aggregate()
   //    .match(
   //       _.or([{
   //             _openid: event.option
   //          },
   //          {
   //             receiveId: event.option
   //          }
   //       ])
   //    )
   //    .group({
   //       _id: '$_openid'
   //    })
   //    .project({

   //    })
   //    .end()
   //    .then(res => {
   //       console.log('res', res)
   //       rest = res
   //    })
   //    .catch(err => {
   //       console.log('err', err)
   //    })
   // return rest

   } catch (err) {
      console.log('err', err)
   }

}