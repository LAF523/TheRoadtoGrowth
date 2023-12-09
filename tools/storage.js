// 简单封装sessionStorage,localStorage
  class Storage {
    constructor(type = 'local') {
      this.storage = window[type + 'Storage'];
    }
    // 处于单个key,或者key数组,返回一个对象
    getStorage (...args) {
      args = args.flat(Infinity);
      return args.reduce((acc, curr) => {
        acc[key] = this.storage.getItem(key);
        return acc;
      }, {})
    }
    // 传入一个对象
    setStorage (obj) {
      if (Object.prototype.toString.call(obj) !== '[object Object]') {
        return false;
      }
      Object.entries(obj).forEach(([key, value]) => {
        this.storage.setItem(key, value);
      })
    }
    // 传入key,或key数组
    removeStorage (...args) {
      args = args.flat(Infinity);
      if (args.length === 0) {
        return false;
      }
      args.forEach(item => this.storage.removeItem(item));
    }
    clearStorage () {
      this.storage.clear();
    }
  }
