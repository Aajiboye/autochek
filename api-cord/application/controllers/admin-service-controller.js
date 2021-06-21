/* eslint-disable no-underscore-dangle */
const adminService = require('../services/adminservice');
const respDeco = require('../utils/responseAdapter'); // response decorator
const logger = require('../services/logger').getInstance('CORD-LOCSRV-ADMIN').getLogInstance();

const setRefLoc = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`>>>> ${correlationID} Entered set ref location service`);
    const respData = (await adminService.setRefLoc(req.body, req.headers)).body;

    if (!respData.data) {
      logger.error(`<<<< ${correlationID} Error in setting location ${respData.message} `);
      return res.json(respDeco.error(respData.error, respData.message, respData.statuscode));
    }
    logger.trace(`<<<< ${correlationID}: ${respData.message}`);
    return res.json(
      respDeco.success(respData.data, respData.message || respDeco.responsetemplate.SUCCESS),
    );
  } catch (error) {
    logger.error(`<<<< ${correlationID} Error in setting location ${error}`);
    return res.json(respDeco.error(error, respDeco.responsetemplate.GENERALERROR, 500));
  }
};

module.exports = {
  setRefLoc,
};
