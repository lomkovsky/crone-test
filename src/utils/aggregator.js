const Order = require('../models/order');

const aggregator = async (daysNumber, variant) => {
  try {
    const endDate = new Date();
    const startDate = new Date();
    let monthNumber;
    switch (daysNumber) {
      case 'oneMonth': 
        monthNumber = 1;
        break;
      case 'threeMonth': 
        monthNumber = 3;
        break;
      case 'halfYear': 
        monthNumber = 6;
        break;
      case 'year': 
        monthNumber = 12;
        break;
      default:
        break;
    }
    startDate.setMonth(startDate.getMonth() - monthNumber);
    const agg = Order.aggregate([
      { $match: { variant, 'order.orderDate': { $gte: startDate, $lt: endDate } } },
      {
        $group: {
          _id: '$productId',
          productId: { $addToSet: '$productId' },
          count: { $sum: 1 },
          cashFlow: { $sum: '$order.price' } 
        },
      },
      {
        $project: {
          productId: '$_id',
          cashFlow: '$cashFlow',
          sales: '$count',
          _id: 0 
        }
      },
    ]);
    const result = await agg.exec();
    let resultOfMaxCashFlow;
    let maxCashFlow = 0;
    result.forEach((element) => {
      if (maxCashFlow <= element.cashFlow) {
        maxCashFlow = element.cashFlow;
        resultOfMaxCashFlow = element;
      }
    });
    return resultOfMaxCashFlow;
  } catch (e) {
    console.log(e);
  }
};
module.exports = aggregator;
