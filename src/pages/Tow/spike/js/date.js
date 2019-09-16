//时间处理，格式(00小时10分20秒)
export function ChineseDateHours(timestamp) {
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var h = change(date.getHours()) + '小时';
  var m = change(date.getMinutes()) + '分';
  var s = change(date.getSeconds())+'秒';
  return h + m + s;
}
//时间处理，格式(00:10:20)
export function EnglishDateHours(timestamp) {
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var h = change(date.getHours()) + ':';
  var m = change(date.getMinutes()) + ':';
  var s = change(date.getSeconds());
  return h + m + s;
}
//时间处理，格式(2019-6-17 00:10:20)
export function EnglishDate(timestamp) {
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = change(date.getDate()) + ' ';
  var h = change(date.getHours()) + ':';
  var m = change(date.getMinutes()) + ':';
  var s = change(date.getSeconds());
  return Y + M + D + h + m + s;
}
//时间处理，格式(2019-6-17 00:10:20)
export function EnglishDateTime(timestamp) {
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = change(date.getDate()) + ' ';
  return Y + M + D;
}
//时间处理
function change(t) {
  if (t < 10) {
    return "0" + t;
  } else {
    return t;
  }
}
