const aggregator = require('./aggregator');

const Report = require('../models/report');

const executeAggregation = async () => {
  try {
    const periods = ['oneMonth', 'threeMonth', 'halfYear', 'year'];
    const variants = ['S', 'M', 'L', 'XL'];
    const newReport = {
      oneMonth: {},
      threeMonth: {},
      halfYear: {},
      year: {},
    };
    for (const period of periods) {
      for (const variant of variants) {
        const result = await aggregator(period, variant);
        if (result) newReport[period][variant] = result;
      }
    }
    const report = await new Report(newReport);
    report.save();
  } catch (e) {
    console.log(e);
  }
};
module.exports = executeAggregation;
