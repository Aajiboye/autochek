/* eslint-disable no-underscore-dangle */
const locService = require('../services/locationservice.js');
const respDeco = require('../utils/responseAdapter'); // response decorator
const logger = require('../services/logger').getInstance('CORD-LOCSRV').getLogInstance();

const add = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`>>>> ${correlationID} Entered add location`);
    const respData = (await locService.add(req.body, req.headers)).body;

    if (!respData.data) {
      logger.error(`<<<< ${correlationID} Error in adding location ${respData.message} `);
      return res.json(respDeco.error(respData.error, respData.message, respData.statuscode));
    }
    logger.trace(`<<<< ${correlationID} Location added successfully `);
    return res.json(
      respDeco.success(respData.data, respData.message || respDeco.responsetemplate.SUCCESS),
    );
  } catch (error) {
    logger.error(`<<<< ${correlationID} Error in adding location ${error}`);
    return res.json(respDeco.error(error, respDeco.responsetemplate.GENERALERROR, 500));
  }
};

const update = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`>>>> ${correlationID} Entered update location service`);
    const respData = (await locService.update(req.body, req.params.locationID, req.headers)).body;

    if (!respData.data) {
      logger.error(`<<<< ${correlationID} Error in updating location ${respData.message} `);
      return res.json(respDeco.error(respData.error, respData.message, respData.statuscode));
    }
    logger.trace(`<<<< ${correlationID}: ${respData.message}`);
    return res.json(
      respDeco.success(respData.data, respData.message || respDeco.responsetemplate.SUCCESS),
    );
  } catch (error) {
    logger.error(`<<<< ${correlationID} Error in updating location ${error}`);
    return res.json(respDeco.error(error, respDeco.responsetemplate.GENERALERROR, 500));
  }
};

const softDelete = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`>>>> ${correlationID} Entered soft delete location service`);
    const respData = (await locService.softDelete(
      req.body, req.params.locationID, req.headers,
    )).body;

    if (!respData.data) {
      logger.error(`<<<< ${correlationID} Error in deleting location ${respData.message} `);
      return res.json(respDeco.error(respData.error, respData.message, respData.statuscode));
    }
    logger.trace(`<<<< ${correlationID}: ${respData.message}`);
    return res.json(
      respDeco.success(respData.data, respData.message || respDeco.responsetemplate.SUCCESS),
    );
  } catch (error) {
    logger.error(`<<<< ${correlationID} Error in deleting location ${error}`);
    return res.json(respDeco.error(error, respDeco.responsetemplate.GENERALERROR, 500));
  }
};

const hardDelete = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`>>>> ${correlationID} Entered hard delete location service`);
    const respData = (await locService.hardDelete(
      req.body, req.params.locationID, req.headers,
    )).body;

    if (!respData.data) {
      logger.error(`<<<< ${correlationID} Error in deleting location ${respData.message} `);
      return res.json(respDeco.error(respData.error, respData.message, respData.statuscode));
    }
    logger.trace(`<<<< ${correlationID}: ${respData.message}`);
    return res.json(
      respDeco.success(respData.data, respData.message || respDeco.responsetemplate.SUCCESS),
    );
  } catch (error) {
    logger.error(`<<<< ${correlationID} Error in deleting location ${error}`);
    return res.json(respDeco.error(error, respDeco.responsetemplate.GENERALERROR, 500));
  }
};

// update bid
const all = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`>>>> ${correlationID} Entered get all locations service`);
    const respData = (await locService.all(req.body, req.headers)).body;

    if (!respData.data) {
      logger.error(`<<<< ${correlationID} Error fetching locations ${respData.message} `);
      return res.json(respDeco.error(respData.error, respData.message, respData.statuscode));
    }
    logger.trace(`<<<< ${correlationID}: ${respData.message} `);
    return res.json(
      respDeco.success(respData.data, respData.message || respDeco.responsetemplate.SUCCESS),
    );
  } catch (error) {
    logger.error(`<<<< ${correlationID} Error fetching locations ${error}`);
    return res.json(respDeco.error(error, respDeco.responsetemplate.GENERALERROR, 500));
  }
};

// delete bid
const single = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`>>>> ${correlationID} Entered get single location service`);
    const respData = (await locService.single(req.body, req.params.locationID, req.headers)).body;

    if (!respData.data) {
      logger.error(`<<<< ${correlationID} Error in getting location ${respData.message} `);
      return res.json(respDeco.error(respData.error, respData.message, respData.statuscode));
    }
    logger.trace(`<<<< ${correlationID}: ${respData.message} `);
    return res.json(
      respDeco.success(respData.data, respData.message || respDeco.responsetemplate.SUCCESS),
    );
  } catch (error) {
    logger.error(`<<<< ${correlationID} Error in getting location ${error}`);
    return res.json(respDeco.error(error, respDeco.responsetemplate.GENERALERROR, 500));
  }
};

const calcDist = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`>>>> ${correlationID} Entered calculate distance service`);
    const respData = (await locService.calcDist(req.body, req.params.locationID, req.headers)).body;

    if (!respData.data) {
      logger.error(`<<<< ${correlationID} Error in getting distance ${respData.message} `);
      return res.json(respDeco.error(respData.error, respData.message, respData.statuscode));
    }
    logger.trace(`<<<< ${correlationID}: ${respData.message} `);
    return res.json(
      respDeco.success(respData.data, respData.message || respDeco.responsetemplate.SUCCESS),
    );
  } catch (error) {
    logger.error(`<<<< ${correlationID} Error in getting distance  ${error}`);
    return res.json(respDeco.error(error, respDeco.responsetemplate.GENERALERROR, 500));
  }
};

module.exports = {
  add,
  softDelete,
  update,
  hardDelete,
  single,
  calcDist,
  all,
};
