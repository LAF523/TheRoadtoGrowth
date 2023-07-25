/**
 * @message: 
 * @param {window} win window对象
 * @return {*}
 * @since: 2022-06-30 18:55:05
 */
(function (win) {
  /**
   * @message: js根据屏幕DPR动态修改放大缩小比例,同时根据比率动态修改基础字体大小.rem方案
   * @param {*} baseFontSize 即出字体大小,若理想视口为375,则基础字体为37.5,或3.75
   * @param {*} fontscale 字体放大比例,有的业务需要
   * @return {*}
   * @since: 2022-06-30 18:55:11
   */  
  win.flex = (baseFontSize, fontscale) => {
    const _baseFontSize = baseFontSize || 100;
    // const _fontscale = fontscale || 1;
    // 兼容处理
    const doc = win.document;
    const ua = navigator.userAgent;
    const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
    const UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
    const isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
    const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
    //获取设备DPR 赋值给变量 dpr
    let dpr = win.devicePixelRatio || 1;
    if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
      // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
      dpr = 1;
    }
    //根据dpr 反比设置scale  dpr越高 缩放比例 越小  2dpr => scale(.5) 3dpr=>scale(.33)
    const scale = 1 / dpr;
    //获取meta viewport标签
    let metaEl = doc.querySelector('meta[name="viewport"]');
    if (!metaEl) {
      //如果没有 创建一个
      metaEl = doc.createElement('meta');
      metaEl.setAttribute('name', 'viewport');
      doc.head.appendChild(metaEl);
    }

    // 设置meta viewport 属性 拼接缩放比例到 content值中
    metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`);
    //根据缩小倍率 反向 等比放大 html的font-size 保证实际效果一样
    doc.documentElement.style.fontSize = `${_baseFontSize  * dpr}px`;
    document.documentElement.setAttribute('data-dpr', dpr)
  };
})(window);