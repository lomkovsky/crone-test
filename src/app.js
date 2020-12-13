const express = require('express');
const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const cron = require('node-cron');

const mongooseInit = require('./db/mongooseInit');
const routers = require('./routers/routers');
const executeAggregation = require('./utils/executeAggregation');

const app = express();
// Parse requests.
app.use(bodyParser.json({
  limit: '16mb',
  extended: true
}));

app.use(bodyParser.urlencoded({
  limit: '16mb',
  extended: true
}));

// db initialization
mongooseInit(process.env.MONGODB);

// cron.schedule('0 0 1 * *', () => {
cron.schedule('*/5 * * * *', () => {
  console.log(new Date());
  // console.log('running a task every month');
  console.log('running a task every five minute (for testing purpose)');
  executeAggregation();
});

app.get('/', asyncHandler(async (req, res) => { 
  res.json({ welcomeMessage: 'Home page' });
}));

app.use(routers);

// Error processing
app.use(async (err, req, res, next) => {
  if (err) {
    if (process.env.ENV !== 'test') {
      console.log('Error processing: ', err);
    }    
    return res.status(err.status || 503).send(err.message);
  }
  next();
});
// Catch the unhandled Rejection
process.on('unhandledRejection', (err) => {
  if (process.env.ENV !== 'test') {
    console.log('Caught exception: ', err);
  }
});
process.on('uncaughtException', (err) => {
  if (process.env.ENV !== 'test') {
    console.log('Caught uncaughtException: ', err);
  }
});

module.exports = app;
