const log4js = require('koa-log4');
const path = require('path');

// Log4js配置文件
log4js.configure({
  appenders: {
    access: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd',
      filename: path.join('logger', 'access.log')
    },
    application: {
      type: 'dateFile',
      pattern: '-yyyy-Mm-dd',
      filename: path.join('logger', 'application.log')
    },
    out: {
      type: 'console'
    }
  },
  categories: {
    default: { appenders: ['out'], level: 'info' },
    access: { appenders: ['access'], level: 'info' },
    application: { appenders: ['application'], level: 'warn' }
  }
});

exports.accessLogger = () => log4js.koaLogger(log4js.getLogger('access'));
exports.logger = log4js.getLogger('application');