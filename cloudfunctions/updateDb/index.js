const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event) => {
	const db = cloud.database()
   console.log('hahahah',event)
	try {
		console.log('event',event)
		console.log('event1 1',event.sid)
		var result = await db.collection('chat_info').where({
         _openid: event.sid,
         receiveId: event.userInfo.openId,
         readFlag: false
		}).update({
			data: {
				readFlag: true
			}
		})
		console.log('result',result)
		if (result.stats.updated) {//updated = 1
			return {
				message: '更新成功',
				result,
				event
			}
		} else {//updated = 0
		//这里有两种情况
		//1.id在数据库中不存在
		//2.index和imgUrl与数据库中的一样,也就是数据没有更改的情况下执行了更新操作
			return {
				message: result,
				event
			}
		}
	} catch (e) {
      console.log('hahahah',e)
		return {
			message: e.message,
		}
	}
}