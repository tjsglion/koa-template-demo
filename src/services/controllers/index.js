import HomeController from './HomeController';

const homeController = new HomeController();

export default {
  getAllRouter: (app, router) => {
    router
      .get('/', homeController.actionIndex)
      .get('/index.html', homeController.actionIndex)
      .get('/add', homeController.actionAdd);

    app.use(router.routes()).use(router.allowedMethods());
  }
}
