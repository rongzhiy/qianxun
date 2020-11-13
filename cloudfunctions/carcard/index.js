const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.ocr.driverLicense({
        type: 'photo',
        imgUrl: event.imgUUU
      })
    return result
  } catch (err) {
    return err
  }
}