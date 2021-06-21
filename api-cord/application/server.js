// eslint-disable-next-line import/no-unresolved

// Load Config
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const logger = require('./services/logger').getInstance('CORD').getLogInstance();
const apiAccessMiddleware = require('./middleware/api-access-auth');
const correlationIDMiddleware = require('./middleware/correlation-id-middleware');

// Routes
// app routes
const locationRoutes = require('./routes/loc.route');
const adminRoutes = require('./routes/admin.route');

const app = express();
// eslint-disable-next-line no-console

/*
  set up the application environments.
*/
app.use(cors());
app.use(express.json({ extended: false }));
// sent the maximum input
app.use(bodyParser.json({ limit: 16777216 }));
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(bodyParser.json({ type: '*/*' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  logger.trace(req.method, `[${req._entity}]`, req.path);
  next();
});

app.use(correlationIDMiddleware);
app.use(apiAccessMiddleware);

app.get('/health', (req, res) => {
  res.send(`Autochek API is live ${config.isProduction()}`);
});

// admin routes
app.use('/autochek/v1/user', locationRoutes);
app.use('/autochek/v1/admin', adminRoutes);

// start the listening
app.listen(config.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is up and running on port number ${config.PORT}`);
});
