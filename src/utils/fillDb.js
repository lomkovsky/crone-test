require('dotenv').config();
const fs = require('fs');
const mongoose = require('mongoose');

const mongooseInit = require('../db/mongooseInit');
const Order = require('../models/order');

// connect to local DB
mongooseInit(process.env.MONGODB);

const fillDb = async (step) => {
  const startTime = new Date().getTime();
  const roundStep = Math.round(step);
  let stepFromOneToFive;
  if (roundStep <= 0) {
    stepFromOneToFive = 1;
  } else if (roundStep <= 5) {
    stepFromOneToFive = roundStep;
  } else {
    stepFromOneToFive = 5;
  }
  console.log('Step = ', stepFromOneToFive);
  let ordersCount = await Order.find({}).countDocuments();
  console.log(ordersCount, ' orders now in the BD');
  if (ordersCount >= 1200000) {
    await Order.collection.drop();
    console.log('BD is cleared');
    const ordersCount = await Order.find({}).countDocuments();
    console.log(ordersCount, ' orders now in the BD');
  }
  const data = fs.readFileSync('./output.json', 'utf8');
  const databases = JSON.parse(data);
  const orders = [];
  let countOfProduct = 0;
  databases.forEach((order) => {
    if (!orders[order.productId - 1]) {
      countOfProduct += 1;
      orders[order.productId - 1] = [];
    }
    orders[order.productId - 1].push(order);
  });
  console.log(countOfProduct, ' products left');      
  let startFrom = 0;
  const sendPartToBd = (startNumber, operationsNumber) => {
    const endNumber = startNumber + operationsNumber;
    let resultOfInsertArray = [];
    for (let j = startNumber; j < endNumber; j += 1) {
      if (orders[j] && orders[j].length) {
        console.log('Order with id = ', orders[j][0].productId, ' goes to the DB');
        const resultOfInsert = Order.insertMany(orders[j]);
        resultOfInsertArray.push(resultOfInsert);
      }
    }
    startFrom += stepFromOneToFive;
    return resultOfInsertArray;
  };
  while (countOfProduct > 0) {
    const resultOfInsertArray = sendPartToBd(startFrom, stepFromOneToFive);
    let resultPromiseAll = await Promise.all(resultOfInsertArray);
    if (resultPromiseAll) {
      countOfProduct -= stepFromOneToFive;
      console.log(countOfProduct, ' products left');
    }
  }
  const endTime = new Date().getTime();
  const spentTime = endTime - startTime;
  console.log('Spent ', spentTime / 60000, ' min');
  ordersCount = await Order.find({}).countDocuments();
  console.log(ordersCount, ' orders now in the BD');
  mongoose.disconnect();
   
};

// if you pass step = 1 it took 5,1 min
// if you pass step = 2 it took 5,13 min
// if you pass step = 3 it took 4,68 min
// if you pass step = 5 it took 5,27 min
fillDb(3);
