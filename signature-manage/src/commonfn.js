import moment from 'moment';

//过滤时间
export const filterDate = (date, fmt = 'YYYY-MM-DD HH:mm') => {
  /**
   *
   * date 1.支持10位unix时间戳
   *      2.支持 new Date()
   *      3.fmt 默认返回格式'YYYY-MM-DD HH:mm' 可自行传递。
   */
  var timezone = 8; //目标时区时间，东八区
  var offset_GMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
  if (!date) {
    return '';
  }
  if (typeof date === 'number') {
    date = new Date(date * 1000);
  }
  var nowDate = date.getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
  var targetDate = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000);

  var o = {
    'M+': targetDate.getMonth() + 1,
    'D+': targetDate.getDate(),
    'h+': targetDate.getHours() % 12 === 0 ? 12 : targetDate.getHours() % 12,
    'H+': targetDate.getHours(),
    'm+': targetDate.getMinutes(),
    's+': targetDate.getSeconds(),
    'q+': Math.floor((targetDate.getMonth() + 3) / 3),
    S: targetDate.getMilliseconds(),
  };
  var week = {
    '0': '\u65e5',
    '1': '\u4e00',
    '2': '\u4e8c',
    '3': '\u4e09',
    '4': '\u56db',
    '5': '\u4e94',
    '6': '\u516d',
  };
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (targetDate.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') +
        week[date.getDay() + ''],
    );
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      );
    }
  }
  return fmt;
};
// 时间字符串转时间戳
export function timeStrForUnix(timeStr) {
    if (timeStr && timeStr !== "") {
        return moment(timeStr).unix();
    } else {
        return null;
    }
}

//时间戳转时间字符串
export function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000), //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + "-",
        M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-",
        D = date.getDate() + " ",
        h = date.getHours() + ":",
        m = date.getMinutes() + ":",
        s = date.getSeconds();
    return Y + M + D + h + m + s;
}