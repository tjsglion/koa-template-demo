class HomeController {
  constructor () {}
  async actionIndex (ctx, next) {
    ctx.body = await ctx.render('index.html');
  }
  async actionAdd (ctx, next) {
    ctx.body = await ctx.render('add.html');
  }
}

module.exports = HomeController;
