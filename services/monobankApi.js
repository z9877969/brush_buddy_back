const path = require('path');
const axios = require('axios');
// const { monobank: mono, order } = require('../constants');
const { FRONTEND_URL, BACKEND_URL, MONOBANK_TOKEN } = require('../envConfigs');

const instance = axios.create({
  baseURL: 'https://api.monobank.ua/api',
  headers: {
    'x-token': MONOBANK_TOKEN,
    'Content-Type': 'application/json',
  },
});

const pathDict = {
  CREATE_INVOICE: '/merchant/invoice/create',
};

// const getPaymentData = ({
//   orderId,
//   orderTotalPrice,
//   productsTotalAmount,
//   productsList,
//   ccy,
// }) => ({
//   order_ref: orderId, // x ID замовлення або ID корзини замовлення, який формується мерчантом
//   amount: orderTotalPrice, // x Загальна сума замовлення
//   ccy, // Цифровий ISO-код валюти (за замовчуванням 980 - грн.)

//   count: productsTotalAmount, // x Кількість товарів у чеку
//   products: productsList, // Масив товарів у замовленні, кожен товар має наступні параметри
//   /*
// name: curProductName, // x Назва товару
// code_product: curProdoctCode, // Код товару
// code_checkbox, // Код товару (checkbox), якщо є підключення
// cnt: curProductCount // x Кількість конкретної назви товару
// price: curProductPriceTotal // x Вартість товару
// */
//   // Масив доступних способів доставки для замовлення
//   dlv_method_list: [mono.DELIVERY_METHOD_LIST.NP],
//   // dlv_pay_merchant: true, // Флаг оплати доставки магазином (за замовчуванням - оплачує клієнт)
//   // Масив доступних способів оплати для замовлення
//   payment_method_list: [
//     mono.PAYMENT_METHOD_LIST.CARD,
//     mono.PAYMENT_METHOD_LIST.PAYMENT_ON_DELIVERY,
//   ],
//   callback_url: MONOBANK_CALLBACK_URL + '/api/mono/response', // урл, куди буде повертатись інформація по замовленню

//   return_url: MONOBANK_RESPONSE_URL + '/thank', // урл, куди буде повертатись клієнт - після замовлення
// });

/* 
response example:
{
  "result":{
  "redirect_url":"https://checkout.mono.t3zt.com/resource/order/6f36e458-98ad-474c-bc67-aa56bb60ad64",
  "order_id":"6f36e458-98ad-474c-bc67-aa56bb60ad64"
  }
} 
*/
const getRedirectUrl = (orderNum) =>
  FRONTEND_URL + path.join('/thank', orderNum);
const getWebHookUrl = (orderId) =>
  BACKEND_URL + path.join('/api/order', orderId, 'acquiring/webhook');

const sendPayment = async ({ amount, orderNum, orderId }) => {
  const body = {
    amount: amount * 100,
    ccy: 980,
    redirectUrl: getRedirectUrl(orderNum),
    webHookUrl: getWebHookUrl(String(orderId)),
    validity: 3600,
    paymentType: 'debit',
    merchantPaymInfo: {
      reference: orderNum,
    },
  };

  const { data } = await instance.post(pathDict.CREATE_INVOICE, body);

  // data -> {invoiceId: string, pageUrl: string }
  return data;
};

module.exports = {
  sendPayment,
};
