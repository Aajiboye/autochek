/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/connections/db');
const config = require('./config/index');
const locationRoute = require('./routes/location.route');
const adminRoute = require('./routes/admin.route');

const logger = require('./utils/logger');
const correlationIDMidware = require('./middleware/correlation-id-middleware');
const apiAccessAuthMiddleware = require('./middleware/api-access-auth');

// Connect Database
connectDB();

const app = express();
app.use(cors());
// sent the maximum input
app.use(bodyParser.json({ limit: 16777216 }));
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(bodyParser.json({ type: '*/*' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(correlationIDMidware);
app.use(apiAccessAuthMiddleware);

app.use((req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  logger.trace(req.method, `[${req._entity}]`, req.path);
  next();
});

app.get('/healthcheck', (req, res) => {
  res.send('Server is Up');
});
app.use('/v1/user', locationRoute);
app.use('/v1/admin', adminRoute);

// app.use('/cend/api/v1/admin', user);
app.listen(config.PORT, () => {
  console.log(`Server is up and running on port number ${config.PORT}`);
});
