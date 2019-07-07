class HomeController {
  constructor () {}
  async actionIndex (ctx, next) {
    console.log(123);
    ctx.body = await ctx.render('index.html');
  }
  async actionAdd (ctx, next) {
    ctx.body = await ctx.render('add.html');
  }
}

export default HomeController;
