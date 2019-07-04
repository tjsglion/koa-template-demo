const Koa = require('koa');
const router = require('koa-router')();
const render = require('koa-swig');
const co = require('co');
const { getAllRouter } = require('./services/controllers/index');
const { resolve } = require('path');
const static = require('koa-static');
const {error} = require('./services/middleware/errorHandler');
const {logger, accessLogger} = require('./services/config/koaLogger');
const config = require('./services/config');
const app = new Koa();

// 加载日志中间件
app.use(accessLogger());

// 容错处理
error(app, logger);

// 加载静态资源
app.use(static(config.staticDir));

// const config = require('./webpack.config');
// const webpack = require('webpack');
// const koaWebpack = require('koa-webpack');
getAllRouter(app, router);

app.context.render = co.wrap(render({
  root: config.viewDir,
  cache: false, // 这是ssr渲染解决性能问题的关键点， 生产环境设置为: 'memory'
  ext: 'html',
  autoescape: true,
  writeBody: false
}));

// app.use(async ctx => ctx.body = await ctx.render('index.html'));
// const compile = webpack(config);
// const middleware = await koaWebpack({ compiler });
app.listen(config.port, () => {
  console.log('启动服务成功...');
});