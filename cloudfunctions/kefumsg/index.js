const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

//<!--下载云存储图片-->
let downLoad = async(event, context) => {
    const res = await cloud.downloadFile({
        fileID: 'cloud://xly-zjauh.786c-xly-zjauh-1301501296/else/qq.jpg', // 图片的File ID
    })
    const buffer = res.fileContent
    console.log(buffer)
    return buffer
}

//<!--把媒体文件上传到微信服务器-->
let upload = async(Buffer) => {
    return await cloud.openapi.customerServiceMessage.uploadTempMedia({
        type: 'image',
        media: {
            contentType: 'image/png',
            value: Buffer
        }
    })
}


exports.main = async(event, context) => {
    const wxContext = cloud.getWXContext()

    if (event.Content == '1') {
        let Buffer = await downLoad()
        let meida = await upload(Buffer)
            // console.log(meida)
        try {
      //      <!--发送图片类型消息-->
            const result = await cloud.openapi.customerServiceMessage.send({
                touser: wxContext.OPENID,
                "msgtype": "image",
                "image": {
                    "media_id": meida.mediaId
                }
            })
            return result
        } catch (err) {
            return err
        }
    } else if (event.Title == '自定义标题') { 
    // 根据自定义卡片title触发
        let Buffer = await downLoad()
        let meida = await upload(Buffer)
        try {
            const result = await cloud.openapi.customerServiceMessage.send({
                touser: wxContext.OPENID,
                "msgtype": "image",
                "image": {
                    "media_id": meida.mediaId
                }
            })
            return result
        } catch (err) {
            return err
        }
    } else {
        try {
            await cloud.openapi.customerServiceMessage.send({
                touser: wxContext.OPENID,
                msgtype: 'text',
                text: {
                    content: '您好,很高兴为您服务! 回复1，查看入群二维码'
                }
            });
            return 'success'
        } catch (err) {
            return err
        }
    }
}
