const mongoose = require('mongoose');

const orderSubSchema = new mongoose.Schema({
  productId: Number,
  cashFlow: Number,
  sales: Number
}, {
  timestamps: false,
  _id: false,
});
const variantSubSchema = new mongoose.Schema({
  S: orderSubSchema,
  M: orderSubSchema,
  L: orderSubSchema,
  XL: orderSubSchema
}, {
  timestamps: false,
  _id: false,
});
const reportSchema = new mongoose.Schema({
  oneMonth: variantSubSchema,
  threeMonth: variantSubSchema,
  halfYear: variantSubSchema,
  year: variantSubSchema,  
}, {
  timestamps: true,
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
