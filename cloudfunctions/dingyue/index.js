const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
        touser: event.openid, //需要推送给那个用户
        page: 'pages/launch/launch',
        lang: 'zh_CN',
        data: {
          thing1: {
            value: 'Alan'   //发送方
          },
          thing2:{
            value:'你的卡掉了'  //发送内容
          },
          date3: {
            value: '2020-11-26 19:45'   //消息时间
          },
          thing7: {
            value: '请不要轻易相信对方'    //温馨提示
          }    
        },
        templateId: '3d7cg7Szjlev7SLtPG44V_MFeiamw57ipm87gOVCiMY',  //订阅消息id
        // miniprogramState: 'developer'
      })
    return result
  } catch (err) {
    return err
  }
}