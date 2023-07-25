/**
 * @message: 监听事件兼容版
 * @param {*} ele 被监听事件的DOM元素
 * @param {*} type 被监听的事件类型
 * @param {*} fn 事件触发执行的函数
 * @param {*} status 设置在哪个阶段执行函数
 * @return {*} 返回一个包含remove属性的对象,用于解绑监听
 * @since: 2022-05-02 09:51:02
 */
function eventListener(ele, type, fn, status) {
  if (ele.addEventListener) {
    status = status || false;
    ele.addEventListener(type, fn, status);
  } else {
    ele.attachEvent('on' + type, fn);
  }
  return {
    remove: function () {
      if (ele.removeEventListener) {
        ele.removeEventListener(type, fn, status);
      } else {
        ele.detachEvent('on' + type, fn);
      }
    },
  };
}
/**
 * @message: 封装元素的获取方式
 * @param {*}ele css选择器
 * @return {*}DOM对象
 * @since: 2022-05-02 10:00:31
 */
function $(ele) {
  return document.querySelector(ele);
}
function $$(ele) {
  return document.querySelectorAll(ele);
}
/**
 * @message: 查找指定在父元素中的下标元素下标
 * @param {*} ele 给定的元素
 * @return {*} i 返回下标值
 * @since: 2022-05-02 18:23:42
 */
function getEleIdx(ele) {
  for (let i = 0, len = ele.parentElement.children.length; i < len; i++) {
    if (ele.parentElement.children[i] === ele) {
      return i;
    }
  }
}
/**
 * @message: 获取元素在window view中左上角的坐标
 * @param {*} ele 目标元素
 * @return {*} 一个对象,包含坐标值
 * @since: 2022-05-07 18:09:12
 */
function getElePos(ele) {
  let x = 0;
  let y = 0;
  while (ele != null) {
    x += ele.offsetLeft;
    y += ele.offsetTop;
    ele = ele.offsetParent;
  }
  return { 
    x,
    y,
  };
}
/**
 * @message: 设置元素样式
 * @param {*} ele 目标元素
 * @param {*} style 样式组成的JSON对象
 * @return {*}
 * @since: 2022-05-07 18:12:27
 */
function setStyle(ele, styleJson) {
  for (let key in styleJson) {
    ele['style'][key] = styleJson[key];
  }
  return false;
}
/**
 * @message: transition版本运动框架封装,不常用
 * @param {*} ele 目标元素
 * @param {*} styleJson 变换样式对应的样式对象
 * @param {*} time 过渡时间
 * @param {*} speed 速度
 * @param {*} callback 回调函数
 * @return {*}
 * @since: 2022-05-07 18:40:36
 */
function animateTrans(ele, styleJson, time, speed, callback) {
  time = time || 0.3;
  speed = speed || 'linear';
  ele.style.transition = `${time}s ${speed}`;
  setStyle(ele, styleJson);
  ele.addEventListener('transitionend', fn, false);
  function fn() {
    // 异步保持代码执行顺序
    setTimeout(function () {
      callback && callback();
    });
    ele.removeEventListener('transitionend', fn);
    ele.style.transition = '0';
  }
}
/**
 * @message: 定时器版本运动框架
 * @param {*} ele 目标元素
 * @param {*} styleJson 变换样式对应的样式对象
 * @param {*} callback 回调函数
 * @return {*}
 * @since: 2022-05-07 21:42:48
 */
function animateInterval(ele, styleJson, callback) {
  clearInterval(ele.time);
  let toggle = false;
  let screeningUnitArr = [
    'width',
    'height',
    'top',
    'left',
    'bottom',
    'right',
    'marginTop',
    'marginLeft',
    'marginRight',
    'marginBottom',
    'paddingTop',
    'paddingLeft',
    'paddingRight',
    'paddingBottom',
    'fontSize',
    'borderWidth',
  ];
  ele.time = setInterval(function () {
    toggle = true;
    for (let key in styleJson) {
      if (!screeningUnitArr.includes(key)) {
        ele.style[key] = styleJson[key];
        continue;
      }
      let target = parseInt(styleJson[key]);
      curr = parseInt(getStyle(ele, key));
      speed = (target - curr) / 20;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); // 保证speed为负值时取整相同
      ele.style[key] = curr + speed + 'px';
      if (curr !== target) {
        // 只要有一个属性的值未达到指定值,不允许清除该定时器
        toggle = false;
      }
    }
    if (toggle) {
      clearInterval(ele.time);
      callback && callback();
    }
  }, 1000 / 60);
}
/**
 * @message: 获取实际样式
 * @param {*} obj
 * @param {*} attr
 * @return {*}
 * @since: 2022-05-07 18:51:43
 */
function getStyle(obj, attr) {
  return obj.currentStyle
    ? obj.currentStyle[attr]
    : getComputedStyle(obj, false)[attr];
}
/**
 * @message: 格式化url中的参数
 * @param {String} url字符串
 * @return {object} 将参数的键值对作为对象的键值对返回
 * @since: 2022-05-18 16:32:48
 */
function urlParams(url) {
  let o = {};
  let regExp = /((\w*)=([0-9a-zA-Z\.\u4e00-\u9fa5]*)?)?/g;
  url.replace(regExp, function (m, a, b, c) {
    if (b && c) {
      o[b] = c;
    }
  });
  return o;
}
/**
 * @message: 格式化时间
 * @param {String}时间格式,YYYY-MM-dd hh:mm:ss其中的分隔符可自己替换
 * @return {String} 返回格式化后的时间格式
 * @since: 2022-05-18 17:11:14
 */
function formatDate(format) {
  // ◆ 使用prototype定义原型方法
  /*
   * eg:format="YYYY-MM-dd hh:mm:ss";
   */
  let o = {
    // ◆ 键值对形式的数组。只能通过加强的for循环来迭代取值
    'M+': this.getMonth() + 1, // month
    'd+': this.getDate(), // day
    'h+': this.getHours(), // hour
    'm+': this.getMinutes(), // minute
    's+': this.getSeconds(), // second
    'q+': Math.floor((this.getMonth() + 3) / 3), // quarter (季度)
    S: this.getMilliseconds(),
    // millisecond (毫秒)
  };

  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + '') // ◆ RegExp.$1 : 取正则表达式中第一个分组匹配到的内容
        .substr(4 - RegExp.$1.length)
    );
  }

  for (let k in o) {
    // ◆ 加强的for循环。k为键值对数组o中的键，故o[k]为对应的值
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      ); // ◆ 这里的逻辑很好
    }
  }
  return format;
}
/**
 * @message: 参数修正
 * @param {String}金额
 * @return {String}修正后的金额
 * @since: 2022-05-18 17:13:28
 */
function _regValue(value) {
  //非数字验证
  value = value.replace(/[^\d\.]+/g, '');

  //强制保留两位小数
  let doubleReg = /^(\d+)\.(\d\d).*$/;
  value = value.replace(doubleReg, '$1.$2');

  //开始非零验证
  value = value.replace(/^(0)(\d)$/, '$2');

  //小数点验
  value = value.replace(/^(\.+)$/, '0.');
  value = value.replace(/^(\d*)(\.+)$/, '$1.');

  //巨大数值
  value = value.replace(/^(\S{8})(\S+)$/, '$1');

  //只保留一个 .
  value = value.replace(/(\d+\.)(\d)(\.+)/, '$1$2');

  return value;
}
/**
 * @message: 设置cookie
 * @param {Object} cookie对象
 * @param {number} 过期间隔 单位s,Infinity设置为永久
 * @return {*} 无
 * @since: 2022-05-19 10:58:49
 */
 function setCookie(cJson,t){
  let date = new Date();
  date.setTime(date.getTime() + t*1000);
  date = date.toGMTString();
  if(t === Infinity){
    date = "Fri, 31 Dec 9999 13:32:02 GMT"
  }
  for(let key in cJson){
    document.cookie = `${key}=${cJson[key]};expires =${date} `
  }
}
/**
 * @message: 获取指定名cookie的值
 * @param {String} cookie名称,可传入任意个
 * @return {Object} cookie名称为属性,对应cookie值为属性值,只包含存在的cookie
 * @since: 2022-05-19 11:40:59
 */
function getCookie (ss) {
  let cookieStr = document.cookie;
  let arr = []
  for (let key of arguments) {
    arr.push(key)
  }
  return cookieStr.split('; ').reduce(function (acc, curr) {
    if (arr.includes(curr.split('=')[0])) {
      acc[curr.split('=')[0]] = curr.split('=')[1];
    }
    return acc;
  }, {})
}
/**
 * @message: 删除cookie,实际就是重新设置cookie过期为0时间,
 * @param undefined
 * @return {*}
 * @since: 2022-05-19 16:14:12
 */
 function removeCookie(nameStr) {
  let obj = {};
  obj[nameStr] = null;
  setCookie(obj,-1);
}

/**
 * @message: 递归深拷贝
 * @param {*} obj 引用类型数据
 * @return {*}拷贝过后的值
 * @since: 2022-06-08 09:26:45
 */
function deepCopy(obj){
  if(Array.isArray(obj)){
    return newArr = obj.map(item => deepCopy(item))
  }
  if(typeof obj === "object" && obj !== null){
    return Object.entries(obj).reduce((acc,[key,value]) => (acc[key] = deepCopy(value),acc),{})
  }
  return obj;
}
// //是否支持全屏
// function canFullScreen(){
//   return !!(document.fullscreenEnable || document.mozFullScreenEnable || document.webkitFullscreenEnable || document.msFullscreenEnable)
// }
// //是否是全屏状态
// function isFullScreen(){
//   return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)
// }
/**
 * @message: 开启全屏
 * @param {*} ele 需要开启全屏的元素
 * @return {*}
 * @since: 2022-06-20 19:15:22
 */
function openFullScreen(ele = document){
  ele.msRequestFullscreen?.() ||
  ele.requestFullscreen?.() || 
  ele.webkitRequestFullScreen?.() ||
  ele.mozRequestFullScreen?.() 
}
/**
 * @message: 关闭全屏
 * @param {*} ele 需要关闭全屏的元素
 * @return {*}
 * @since: 2022-06-20 19:16:07
 */
// 关闭全屏,默认参数为document
function closeFwllScreen(ele = document) {
  ele.exitFullscreen?.() ||
  ele.webkitCancelFullScreen?.() ||
  ele.webkitExitFullscreen?.() ||
  ele.mozCancelFullScreen?.() ||
  ele.msExitFullscreen?.();
}

/**
     * @message:格式化时间戳
     * @param {Number} stamp 时间戳
     * @return {Array} 八个项分别代表个 时分秒的十位和个位
     * @since: 2022-07-02 13:06:11
     */    
 function framtTime(stamp){
  let h = ~~(stamp / (60 * 60 * 1000))
  let m = ~~((stamp - h * 60 * 60 * 1000) / (60*1000))
  let s = ~~((stamp - h * 60*60*1000 - m * 60*1000) / 1000)
  let hTen = String(h)[1]? String(h)[0] : '0'
  let hUnits = String(h)[1]  || String(h)[0]
  let mTen = String(m)[1]? String(m)[0] : '0'
  let mUnits = String(m)[1]  || String(m)[0]
  let sTen = String(s)[1] ? String(s)[0] : '0'
  let sUnits = String(s)[1]  || String(s)[0]
  return [hTen,hUnits,mTen,mUnits,sTen,sUnits]
};

/**
    * @message: 验证字符串是否是JSON数据
    * @param {String} json
    * @return {Boolean} true : 是,false : 不是
    * @since: 2022-07-18 00:41:23
    */   
 function isJSON(json){
  try {
    JSON.parse(json)
    return true
  } catch(err){
    return false
  }
 }
 /**
  * @message: 判断浏览器是否是ie8及以下,ie8及以下,对-[-1,]的结果是NAN,
  * @return {Boolean} 返回true表示是ie8及以下
  * @since: 2022-07-21 16:48:48
  */
 function isIE8(){
  return !-[-1,]
 }