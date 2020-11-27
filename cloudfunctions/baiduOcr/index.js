// 云函数入口文件
const cloud = require('wx-server-sdk')
let AipOcrClient = require("baidu-aip-sdk").ocr;
const args  = require("conf.js");
cloud.init();
// 云函数入口函数
exports.main = async (event, context) => {
  console.log('event', event)
  // 设置APPID/AK/SK
  let APP_ID = args.APP_ID;
  let API_KEY = args.API_KEY;
  let SECRET_KEY = args.SECRET_KEY;
  // 新建一个对象，保存一个对象调用服务接口
  let client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
  let fileID = event.fileID;
  let res = await cloud.downloadFile({
    fileID: fileID,
  })
  let image = res.fileContent.toString("base64");
  // 调用通用文字识别, 图片参数为远程url图片
  if (event.idnum) {
    return client.idcard(image, 'front')
  }
  else if (event.banknum) {
    return client.bankcard(image)
  }
  else if (event.stunum) {
    return client.generalBasic(image)
  }
  else if (event.carnum) {
    return client.drivingLicense(image)
  }
  //console.log(result);
  // .then(function (result) {
  //   let result = JSON.stringify(result);
  //   return result;
  // })
}