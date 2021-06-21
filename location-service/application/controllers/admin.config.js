// controller: Handles api requests and responses
const response = require('../utils/responseAdapter'); // response decorator utility
const logger = require('../utils/logger'); // logger

const {
  requiredFieldValidator, validateCoordinates,
} = require('../utils/validators');
const locationManagementService = require('../services/location-management');

// location management flow
exports.set = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`${correlationID}: <<<<<<-- Started set reference location flow -->>>>>>`);
    const {
      coordinates
    } = req.body;

    // validate required fields
    logger.trace(`${correlationID}: Run Validation on required fields `);
    await requiredFieldValidator(
      ['coordinates'],
      Object.keys(req.body),
      correlationID,
    );
    logger.trace(`${correlationID}: Validation Successful`);

    // validate coordinates
    if (!(coordinates.lng && coordinates.lat) ) {
      const error = {
        title: "lng and lat missing",
        detail: "Expected coordinates",
      };
      message = "Lng and Lat coordinates expected for coordinate";
      return res.json(response.error([], error, message));
    }
    // validate long and lat values
    await validateCoordinates('long',coordinates.lng);
    await validateCoordinates('lat',coordinates.lat);

    const locationObj = coordinates;

    logger.trace(`${correlationID}: >>>> Call to locationManagementService.setRefLoc()`);
    const responseData = await locationManagementService.setRefLoc(locationObj, correlationID);

    logger.trace(`${correlationID}: ${responseData.message}`);

    return res.json(response.success(responseData.data, responseData.message));
  } catch (err) {
    logger.debug(`${correlationID}: ${err}`);
    const error = {};
    let message = '';
    err.data ? (error.data = err.data) : (error.data = {});
    err.name ? (error.name = err.name) : (error.name = 'UnknownError');
    err.message ? (message = err.message) : (message = 'Something Failed');
    return res.json(response.error(error, message));
  }
};

