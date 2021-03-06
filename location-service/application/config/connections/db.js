/* eslint-disable no-console */
const mongoose = require('mongoose');
const config = require('../index');

const db = process.env.MONGODB_URI;
const logger = require('../../utils/logger');

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
    console.log('MongoDB Connected...');
  } catch (err) {
    logger.debug(`MongoDB connection failed due to: ${err.message}`);
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
