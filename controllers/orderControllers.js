const path = require('path');
const { order } = require('../constants');
const { PAYMENT_STATUS } = require('../constants/order');
// const { FRONTEND_URL } = require('../envConfigs');
const { createError, createTgMessage } = require('../helpers');
const { Order, Promocode } = require('../models');
const { monobankApi: mbApi, telegramApi: tgApi } = require('../services');

// const orderDataTmpl = {
//   products: [
//     {
//       title: 'Product title',
//       color: 'Product color',
//       flavor: 'Product flavor',
//       volume: '50',
//       amount: 2,
//       price: 100,
//       salePrice: 0,
//     },
//   ],
//   totalPrice: 500, // order total sum
//   promocode: 'Xh5jhGO2',
//   discount: 10,
//   discountedOrerSum: 0,
//   delivery: {
//     phone: 'User phone',
//     name: 'User full name',
//     city: 'delivery city',
//     postOffice: 'delivery post office',
//     comments: 'some user comment',
//   },
//   payment: 'card', // ['card', 'cash']
// };

const createOrder = async (req, res, next) => {
  try {
    const { payment, delivery, promocode } = req.body;
    if (promocode) {
      const promo = await Promocode.findOne({ code: promocode });
      // validate first buy promocode
      if (promo.phone && promo.phone !== delivery.phone) {
        throw createError(403, 'Cann`t use promocode with this phone');
      }
    }
    const orderData = req.body;
    // const orderData = { ...orderDataTmpl };
    const discountedOrerSum = Math.round(
      (orderData.totalPrice * (100 - orderData.discount)) / 100
    );
    if (discountedOrerSum !== orderData.totalPrice) {
      orderData.discountedOrerSum = discountedOrerSum;
    }
    orderData.orderNum = Date.now();

    const newOrder = await Order.create(orderData);
    switch (payment) {
      case order.PAYMENT_METHOD.CARD:
        const data = await mbApi.sendPayment({
          amount: newOrder.discountedOrerSum || newOrder.totalPrice,
          orderNum: newOrder.orderNum,
          orderId: newOrder._id,
        });
        // tgApi.sendMessageTg(createTgMessage(newOrder));
        res.json({
          paymentUrl: data.pageUrl,
          payment: order.PAYMENT_METHOD.CARD,
          orderNum: newOrder.orderNum,
        });
        // res.redirect(data.pageUrl);
        break;
      case order.PAYMENT_METHOD.CASH:
        // 1. send order message to TG
        await tgApi.sendMessageTg(createTgMessage(newOrder));
        // 2. response order num
        res.json({
          orderNum: newOrder.orderNum,
          payment: newOrder.payment,
          paymentUrl: null,
        });
      default:
        break;
    }
  } catch (error) {
    console.dir(error);
    next(error);
  }
};

const checkOrderPayment = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status, modifiedDate } = req.body;
    if (status === PAYMENT_STATUS.SUCCESS) {
      const order = await Order.findByIdAndUpdate(orderId, {
        paymentStatus: PAYMENT_STATUS.SUCCESS,
      });

      const orderMessage = createTgMessage(order);

      await tgApi.sendMessageTg(orderMessage);

      // const redirectUrl = path.join(FRONTEND_URL, 'order/thank', orderNum);
      // res.redirect(redirectUrl);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  checkOrderPayment,
};
