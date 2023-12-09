/*
使用示例:
myAjax({
  method: "post",
  url: "http://localhost:3000/",
  reqData: form,
  con: "file",
  dataType: "json",
  withCredentials: true,
  timeout: 1000,
  reqHeaders: {
    "sa-mm":"自定义请求头",
    "sa-nn":"自定义请求头"
  }
  success: function (data) {
    console.log(data)
  },
  error: function (data) {
    console.log(data)
  }
})
*/
/**
   * @message:  封装Ajax
   * @param {*} method 请求方式
   * @param {*} url 求情地址
   * @param {Object} reqData 请求参数
   * @param {String} con 请求主体类型,根据reqdata类型不同取值为: form表达数据,jsonJSON字符串,file文件,text文本
   * @param {String} dataType 预设响应数据类型: JSON,Buffer,Blob,text
   * @param {Boolean} withCredentials 是否允许服务器设置cookie,或者说是否语序浏览器发送cookie
   * @param {Number} timeout 设置响应超时时间,ms为单位
   * @param {Object} reqHeaders 设置自定义响应头
   * @param {Function} success 成功响应的回调
   * @param {Function} error 失败响应的回调
   * @return {*} 挂载到window对象的_myAjax上
   * @since: 2022-07-21 19:21:58
   */  
(function (win) {
  function myAjax({ method, url, reqData={}, con, dataType,withCredentials=false,timeout=0, reqHeaders, success, error }) {
    if(dataType === "jsonp"){
      createJsonp({url,data,success})
      return false
    }
    const conMap = {
      json: 'applicaltion/json;chartset=utf8',
      text: 'text/plain;chartset=utf8',
      form: 'application/x-www-form-urlencoded',
    };
    method = method.toUpperCase();
    if (method === 'GET') {
      url = url + '?' + objToQueryStr(reqData);
      reqData = null;
    }
    if (con === 'json') {
      reqData = JSON.stringify(reqData);
    }
    if (con === 'form') {
      reqData = objToQueryStr(reqData);
    }
    // 判断IE8及以下
    let xhr = new XMLHttpRequest();
    if(!-[-1,]){
      console.log('ppp')
      xhr = new window.ActiveXObject("Microsoft.XMLHTTP")
    }
    
    
    if (dataType) {
      xhr.responseType = dataType;
    }
    xhr.open(method, url, true);
    if (con !== 'file') {
      xhr.setRequestHeader('Content-Type', conMap[con]);
    }
    // 是否允许携带cookie
    xhr.withCredentials = withCredentials
    // 设置自定义请求头
    if(reqHeaders){
      Object.entries(reqHeaders).forEach(([key,value])=>{
        xhr.setRequestHeader(key,value)
      })
    }
    //timeout 值单位 ms
    if (timeout !== 0) {
      let time = setTimeout(function () {
        //中断请求
        xhr.abort()
        clearTimeout(time)
      }, timeout)
    }
    xhr.onreadystatechange = function () {
      if (xhr.status >= 200 && xhr.status <= 299 && xhr.readyState === 4) {
        let resData = xhr.response;
        if (xhr.responseType === 'json' && isJSON(resData)) {
          resData = JSON.parse(resData);
        }
        success(resData);
      }
    };
    xhr.onerror = function (err) {
      error(err);
    };
    xhr.send(reqData);
  }
  /* 封装:
     want:1.动态创建script,以及回调函数,用完就删除掉
          2.参数传一个对象,对象包含host地址,data请求参数,获取数据回调,
      createJsonp({
        url: http://localhost:3000/,
        data:{
          user: ,
          pwq:
        },
        success: function(data){
          console.log(data)
        }
      })
    */
      function createJsonp({url,data,success}){
        let callbackName  = `fn${new Date().valueOf()}`
        let script = document.createElement("script")
        script.src = url + '?' + objToQueryStr(data) + `&callback=${callbackName}`
        window[callbackName] = function(resdata){
          if(isJSON(resdata)){
            resdata = JSON.parse(resdata)
          }
          success(resdata)
          script.remove()
          delete window[callbackName]
        }
        document.querySelector("head").append(script)
       }

  /**
   * @message: 将对象格式化为query字符串
   * @param {对象} dataObj
   * @return {String} query字符串
   * @since: 2022-07-18 00:39:40
   */
  function objToQueryStr(dataObj) {
    if (Object.entries(dataObj).length === 0) {
      return '';
    }
    return Object.entries(dataObj)
      .map(([key, value]) => {
        return `${key}=${value}`;
      })
      .join('&');
  }
  /**
   * @message: 验证字符串是否是JSON数据
   * @param {String} json
   * @return {Boolean} true : 是,false : 不是
   * @since: 2022-07-18 00:41:23
   */
  function isJSON(json) {
    try {
      JSON.parse(json);
      return true;
    } catch (err) {
      return false;
    }
  }
  win['_myAjax'] = myAjax
})(window);
