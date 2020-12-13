const mongoose = require('mongoose');

mongoose.connection.on('disconnected', () => {
  const errorMessage = 'MongoDB is disconnected';
  console.log(errorMessage);
});
mongoose.connection.on('reconnected', () => {
  console.log('MongoDB is reconnected');
});

const connectWithRetry = (urlEnter) => {
  const url = urlEnter;
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  };
  return mongoose.connect(url, options).then(() => {
    console.log('DB Connected!');
    // Connect services
  }).catch(async (err) => {
    await mongoose.disconnect();
    console.log(`DB Connection Error: ${err.message}`);
    setTimeout(connectWithRetry, 5000);
  });
};

module.exports = connectWithRetry;
