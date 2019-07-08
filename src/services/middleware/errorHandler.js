export default {
  /**
   * 针对 404， 500 进行容错处理
   * @param {*} app
   * @param {*} logger 记录错误日志信息
   */
  error: (app, logger) => {
    // 处理500
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        console.log('errorHandler status: 500;');
        ctx.status = 200;
        // 记录日志
        logger.error(err);
        // 跳转至500页面
        ctx.body = await ctx.render('common/500');
      }
    });
    // 处理404
    app.use(async (ctx, next) => {
      await next();
      console.log('页面状态:', ctx.status);
      if (ctx.status !== 404) return false;
      ctx.status = 200; // 人为指定状态200， 防止百度降权
      ctx.body = await ctx.render('common/404');
    });
  }
}
