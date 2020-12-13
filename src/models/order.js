const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
  },
  price: {
    type: Number,
  },
}, {
  timestamps: false,
  _id: false,
});

const productSchema = new mongoose.Schema({
  productId: {
    type: Number,
  },
  variant: {
    type: String,
  },
  order: orderSchema,
}, {
  timestamps: false,
});

const Order = mongoose.model('Order', productSchema);

module.exports = Order;
