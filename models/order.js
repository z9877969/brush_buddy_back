const { Schema, model } = require('mongoose');
const { generateOrderNum } = require('../helpers');

const orderSchema = new Schema(
  {
    orderNum: {
      type: String,
      required: true,
      default: generateOrderNum(),
    },
    products: [
      {
        title: {
          type: String,
          required: true,
        },
        color: {
          type: String,
          required: false,
          default: '',
        },
        flavor: {
          type: String,
          required: false,
          default: '',
        },
        volume: {
          type: String,
          // match: /^[1-9]{1}[0-9]{0,4}[]$/,
          required: false,
          default: '',
        },
        amount: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        }, // 'Product price',
        salePrice: {
          type: Number,
          required: true,
        }, // 'Product salePrice',
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    }, // order total sum
    promocode: {
      type: String,
      required: false,
      default: null,
    }, // 'Xh5jhGO2',
    discount: {
      type: Number,
      required: false,
      default: 0,
    },
    discountedOrerSum: {
      type: Number,
      required: false,
      default: null,
    }, // sum of order with discount by promocode
    delivery: {
      phone: {
        type: String,
        required: true,
      }, //'User phone'
      name: {
        type: String,
        required: true,
      }, // 'User full name'
      city: {
        type: String,
        required: true,
      }, // 'delivery city'
      postOffice: {
        type: String,
        required: true,
      }, // 'delivery post office',
      comments: {
        type: String,
        required: false,
        default: 'No comment',
      }, // 'some user comment',
    },
    payment: {
      type: String,
      enum: ['card', 'cash'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['success', 'processing'],
      required: false,
      default: 'processing',
    },
    invoiceId: {
      type: String,
      required: false,
      default: '',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

orderSchema.pre('findByIdAndUpdate', function () {
  this.setOptions({ new: true }); // Встановлення опції new: true
});

module.exports.Order = model('order', orderSchema);

// в orderData покласти всі поля з body
// const orderData = {
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
//   // paymentMethod: 'cash', // ['card', 'cash']
//   paymentMethod: 'card', // ['card', 'cash']
// };
