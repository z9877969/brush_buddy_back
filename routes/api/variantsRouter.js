const { createRouter, validateBody } = require('../../helpers');
const { variantsControllers: c } = require('../../controllers');
const { isValidId, upload, authenticate } = require('../../middlewares');

const variantsRouter = createRouter({
  //   `defaultMiddlewares: null,`
  options: [
    {
      method: 'get',
      route: '/',
      middlewares: null,
      controller: (req, res, next) => {
        res.json('OK');
      },
    },
    {
      method: 'post',
      route: '/:prodId',
      middlewares: [authenticate, isValidId],
      controller: c.addVariant,
    },
    {
      method: 'patch',
      route: '/:id',
      middlewares: [authenticate, isValidId],
      controller: c.updateVariant,
    },
    {
      method: 'delete',
      route: '/:id',
      middlewares: [authenticate, isValidId],
      controller: c.deleteVariant,
    },
    {
      method: 'post',
      route: '/images/:id',
      middlewares: [
        authenticate,
        isValidId,
        upload.variantImages.array('images', 8),
      ],
      controller: c.updateVariantImages,
    },
    {
      method: 'patch',
      route: '/popular/:id',
      middlewares: [authenticate, isValidId],
      controller: c.updateVariantsPopularity,
    },
    {
      method: 'get',
      route: '/:id',
      middlewares: [isValidId],
      controller: c.getVariantById,
    },
  ],
});

variantsRouter.setRouter();

module.exports.variantsRouter = variantsRouter.router;
