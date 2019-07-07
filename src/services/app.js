import Koa from 'koa';
import Router from 'koa-router';
import render from 'koa-swig';
import co from 'co';
import indexController from './controllers/index';
import { resolve } from 'path';
import koaStatic from 'koa-static';
import errorHandler from './middleware/errorHandler';
import koaLogger from './config/koaLogger';
import config from './config';
const app = new Koa();
const router = new Router();
const { getAllRouter } = indexController;
const { error } = errorHandler;
const { logger, accessLogger } = koaLogger;
// 加载日志中间件
app.use(accessLogger());

// 容错处理
error(app, logger);

// 加载静态资源
app.use(koaStatic(config.staticDir));
// console.log(indexController, getAllRouter);
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
