const express = require('express');
const asyncHandler = require('express-async-handler');

const router = new express.Router();

const Order = require('../models/order');
const Report = require('../models/report');
const executeAggregation = require('../utils/executeAggregation');

router.get('/countOrders', asyncHandler(async (req, res) => {
  try {
    const ordersDB = await Order.find({}).countDocuments();
    return res.status(200).send({ ordersDB });
  } catch (e) {
    console.log(e);
  }
}));

router.get('/generateReport', asyncHandler(async (req, res) => {
  try {
    executeAggregation();
    return res.status(200).send({ message: 'Start aggregator' });
  } catch (e) {
    console.log(e);
  }
}));

router.get('/reports/latest-report', asyncHandler(async (req, res) => {
  try {
    const reportLatest = await Report.find({}, { _id: 0, createdAt: 0, __v: 0 }).sort({ updatedAt: -1 }).limit(1);
    if (!reportLatest.length) return res.status(404).send({ message: 'Not found' });
    const bestSellers = {
      '30days': reportLatest[0].oneMonth,
      '90days': reportLatest[0].threeMonth,
      '180days': reportLatest[0].halfYear,
      '365days': reportLatest[0].year,
    };
    return res.status(200).send({ bestSellers });
  } catch (e) {
    console.log(e);
  }
}));

module.exports = router;
