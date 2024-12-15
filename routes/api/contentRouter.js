const { createRouter } = require('../../helpers');
const { contentControllers: c } = require('../../controllers');

const contentRouter = createRouter({
  //   `defaultMiddlewares: null,`
  options: [
    {
      method: 'get',
      route: '/:blockName',
      middlewares: null,
      controller: c.getBlockData,
    },
    {
      method: 'patch',
      route:
        '/:blockName' /* blockName is enum: ['main-page', 'footer', 'header'] */,
      middlewares: null,
      controller: c.updateBlockData,
    },
  ],
});

contentRouter.setRouter();

module.exports.contentRouter = contentRouter.router;
