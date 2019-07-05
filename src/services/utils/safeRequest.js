import fetch from 'node-fetch';
import config from '../config/index';
import {logger} from '../config/koaLogger';
class SafeRequest {
  constructor (url) {
    this.url = url;
    this.baseUrl = config.baseUrl;
  }

  fetch (options) {
    options = Object.assign({}, {method: 'GET'}, options);
    const requestUrl = this.baseUrl + this.url;
    const fetchResult = options && (['post', 'POST'].includes(options.method))
      ? fetch(requestUrl, {method: options.method, body: options.body})
      : fetch(requestUrl);

    return new Promise((resolve, reject) => {
      // 最终返回给前缀的结果
      const result = {
        code: 0,
        message: '',
        data: []
      };
      fetchResult
        .then(res => {
          let _json = {};
          try {
            _json = res.json();
          } catch (err) {
            // 解析出错， 发送日志信息
            logger.error(err);
          }
        })
        .then(json => {
            result.data = json;
            resolve(result);
        })
        .catch(err => {
          result.code = 1;
          result.message = '调用后台接口出错啦!!!';
          logger.error(err);
          reject(result);
        })
    });
  }
}

export default SafeRequest;
