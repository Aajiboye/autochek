/* eslint-disable no-unreachable */
const logger = require('../services/logger').getInstance('CORD').getLogInstance();
const responseDecorator = require('../utils/responseAdapter');

module.exports = async (req, res, next) => {
  // Get token from header
  const apiKey = req.header('x-api-key');
  const correlationID = req.header('x-correlation-id');
  logger.trace(`>>>> ${correlationID} Enter API Access Authentication`);
  // Check if not token
  if (!apiKey) {
    logger.debug(`${correlationID} No api key found in request`);
    return res.json(responseDecorator.error({}, responseDecorator.responsetemplate.NOAPI, 401));
  }
  const tokens = process.env.ACTIVETOKENS.split(',');
  if (tokens.includes(apiKey)) {
    logger.trace(`${correlationID} API key available`);
    return next();
  }
  logger.debug(`${correlationID} Unauthorized Access, access key might have been deactivated`);
  return res.json(responseDecorator.error({}, responseDecorator.responsetemplate.NOACCESS, 501));
};
