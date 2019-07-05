import Koa from 'koa';
import Router from 'koa-router';
import render from 'koa-swig';
import co from 'co';
import { getAllRouter } from './services/controllers/index';
import { resolve } from 'path';
import koaStatic from 'koa-static';
import {error} from './services/middleware/errorHandler';
import {logger, accessLogger} from './services/config/koaLogger';
import config from './services/config';
const app = new Koa();
const router = new Router();
// 加载日志中间件
app.use(accessLogger());

// 容错处理
error(app, logger);

// 加载静态资源
app.use(koaStatic(config.staticDir));

// const config from './webpack.config');
// const webpack from 'webpack');
// const koaWebpack from 'koa-webpack');
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