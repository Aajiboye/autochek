/* eslint-disable no-console */
const mongoose = require('mongoose');
const { DATABASE } = require('../index');

const db = DATABASE.MONGODB_URL || DATABASE.MONGODB_LOCAL_URL;
const logger = require('../../services/logger').getInstance('CORD').getLogInstance();

const connectDB = async () => {
  try {
    await mongoose
      .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });

    logger.trace('MongoDB Connected....');
  } catch (err) {
    logger.error(`MongoDB connection failed due to: ${err.message}`);
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
