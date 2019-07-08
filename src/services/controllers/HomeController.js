class HomeController {
  constructor () {}
  async actionIndex (ctx, next) {
    console.log(123);
    ctx.body = await ctx.render('home/pages/list.html');
  }
  async actionAdd (ctx, next) {
    ctx.body = await ctx.render('home/pages/add.html');
  }
}

export default HomeController;
