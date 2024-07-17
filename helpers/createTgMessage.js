const createTgMessage = (orderData) => {
  console.log('orderData :>> ', orderData);
  const minTab = Array(4).fill(' ').join('');
  const middleTab = Array(6).fill(' ').join('');

  /* 
  ** order`s product structure
    {
      title: 'Product title',
      color: 'Product color', // +
      flavor: 'Product flavor', // +
      volume: '50', // +
      amount: 2, // +
      price: 100, // +
      salePrice: 0, // +
      _id: 'slksldksldklskdl', // +
    },
  */

  const productsList = orderData.products.reduce((acc, el, i) => {
    return (
      acc +
      `${i > 0 ? '\n' : ''}<b><i>${i + 1}. ${el.title}</i></b>${
        el.color ? `\n${middleTab}Колір: ` + el.color : ''
      }${el.flavor ? `\n${middleTab}Смак: ` + el.flavor : ''}${
        el.volume ? `\n${middleTab}Об'єм: ` + `${el.volume}` : ''
      }
        Кількість: ${el.amount}шт.
        Ціна: ${
          el.salePrice > 0 ? el.salePrice.toFixed(2) : el.price.toFixed(2)
        }`
    );
  }, '');
  const total = `<b>Загалом:</b> ${orderData.totalPrice}грн${
    orderData.promocode
      ? `\n${minTab}<b>Промокод:</b> ` + orderData.promocode
      : ''
  }${
    orderData.discount
      ? `\n${minTab}<b>Знижка:</b> ` + orderData.discount + '%'
      : ''
  }${
    orderData.discountedOrerSum
      ? `\n${minTab}<b>Сума зі знижкою:</b> ` + orderData.discountedOrerSum
      : ''
  }`;
  const delivery = `
      <b>Телефон</b>: ${orderData.delivery.phone}
      <b>Ім'я</b>: ${orderData.delivery.name}
      <b>Місто</b>: ${orderData.delivery.city}
      <b>Відділення/Поштомат</b>: ${orderData.delivery.postOffice}
      ${
        orderData.delivery.comments
          ? '<b>Коментар</b>: ' + orderData.delivery.comments
          : ''
      }`;
  const paymentMethod =
    orderData.payment === 'card'
      ? '<b>Оплата карткою</b>'
      : '<b>Оплата при отриманні</b>';

  const message = `
      <b>Замовлення №${orderData.orderNum}</b>
      <b>==========</b>\n${productsList}
      ${total}
      ${delivery}
      ${paymentMethod}
      `;

  return message;
};

module.exports = {
  createTgMessage,
};
