import cheerio from 'cheerio';

class HomeController {
  constructor () {}
  async actionIndex (ctx, next) {
    ctx.body = await ctx.render('home/pages/list.html');
  }
  async actionAdd (ctx, next) {
    // 获取请求参数
    const _html = await ctx.render('home/pages/add.html');
    const xpjax = ctx.request.header['x-pjax'];
    if (xpjax) { // xpjax存在: 更新局部数据
      const $ = cheerio.load(_html);
      let _result = '';
      $('.pjaxwrap').each(function () {
        _result += $(this).html();
      });
      $('.lazyloader-js').each(function () {
        _result += `<script src="${$(this).attr('src')}"></script>`
      });
      // $('.lazyloader-css').each(function () {
      //   _result += `<link rel="stylesheet" href="${$(this).attr('href')}">`
      // });
      ctx.body = _result;
    } else { // 直接跳转至落地页
      ctx.body = _html;
    }
  }
}

export default HomeController;
