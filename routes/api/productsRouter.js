const { createRouter, validateBody, validateParams } = require('../../helpers');
const { productsControllers: c } = require('../../controllers');
const {
  productsSchemas: { productAddingSchema, productUpdatingSchema },
} = require('../../schemas');
const { isValidId } = require('../../middlewares');

const productsRouter = createRouter({
  //   defaultMiddlewares: null,
  options: [
    {
      method: 'get',
      route: '/',
      middlewares: null,
      controller: c.getAllProducts,
    },
    {
      method: 'get',
      route: '/popular',
      middlewares: null,
      controller: c.getPopularProducts,
    },
    {
      method: 'get',
      route: '/:productId',
      middlewares: [isValidId],
      controller: c.getProductById,
    },
    {
      method: 'post',
      route: '/',
      middlewares: [validateBody(productAddingSchema)],
      controller: c.addProduct,
    },
    {
      method: 'patch',
      route: '/:id',
      middlewares: [isValidId, validateBody(productUpdatingSchema)],
      controller: c.updateProduct,
    },
    {
      method: 'delete',
      route: '/:id',
      middlewares: [isValidId],
      controller: c.deleteProduct,
    },
    {
      method: 'get',
      route: '/:id/variants',
      middlewares: [isValidId],
      controller: c.getProductVariantsList,
    },
  ],
});

productsRouter.setRouter();

module.exports.productsRouter = productsRouter.router;
