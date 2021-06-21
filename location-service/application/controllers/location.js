// controller: Handles api requests and responses
const response = require('../utils/responseAdapter'); // response decorator utility
const logger = require('../utils/logger'); // logger

const {
  requiredFieldValidator, validateCoordinates,
} = require('../utils/validators');
const locationManagementService = require('../services/location-management');

// location management flow
exports.add = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`${correlationID}: <<<<<<-- Started add location flow -->>>>>>`);
    const {
      description,
      locationTitle,
      website,
      phone,
      contactPerson,
      galleryImages,
      coordinates
    } = req.body;

    // validate required fields
    logger.trace(`${correlationID}: Run Validation on required fields `);
    await requiredFieldValidator(
      ['coordinates', 'locationTitle'],
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
      const message = "Lng and Lat coordinates expected for coordinate";
      return res.json(response.error([], error, message));
    }
    // validate long and lat values
    await validateCoordinates('long',coordinates.lng);
    await validateCoordinates('lat',coordinates.lat);

    const locationObj = {};
    locationObj.description = description;
    locationObj.locationTitle = locationTitle;
    locationObj.website = website;
    locationObj.phone = "+234" + phone.slice(1);
    locationObj.galleryImages = galleryImages;
    locationObj.contactPerson = contactPerson;
    locationObj.geolocation = {
      coordinates: [coordinates.lng, coordinates.lat],
    };

    logger.trace(`${correlationID}: >>>> Call to locationManagementService.add()`);
    const responseData = await locationManagementService.add(locationObj, correlationID);

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

exports.updateLocation = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`${correlationID}: <<<<<<-- Started update location flow -->>>>>>`);
    const {
      description,
      locationTitle,
      website,
      phone,
      contactPerson,
      coordinates,
    } = req.body;
    const { locationID } = req.params;
    if(!locationID){
      return res.json(response.success({}, "No location ID to get"));

    }
    const locationObj = {};
    if (description) locationObj.description = description;
    if (locationTitle) locationObj.locationTitle = locationTitle;
    if (phone) locationObj.phone = "+234" + phone.slice(1);
    if (website) locationObj.website = website;
    if (contactPerson) locationObj.contactPerson = contactPerson;
    if (coordinates) locationObj.coordinates = coordinates;

    logger.trace(`${correlationID}: >>>> Call to locationManagementService.update()`);
    const responseData = await locationManagementService.update(
      locationID, locationObj, correlationID,
    );

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

exports.softDeleteLocation = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`${correlationID}: <<<<<<-- Started delete hospital flow -->>>>>>`);
    logger.trace(`${correlationID}: Run Validation on required fields `);
    const { locationID } = req.params;
    logger.trace(`${correlationID}: Run Validation on required fields `);
    await requiredFieldValidator(
      ['locationID'],
      Object.keys(req.params),
      correlationID,
    );
    logger.trace(`${correlationID}: Validation Successful`);
    logger.trace(`${correlationID}: >>>> Call to locationManagementService.softDelete()`);
    const responseData = await locationManagementService.softDelete(locationID, correlationID);

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
exports.permanentDeleteLocation = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`${correlationID}: <<<<<<-- Started delete hospital flow -->>>>>>`);
    logger.trace(`${correlationID}: Run Validation on required fields `);
    const { locationID } = req.params;
    logger.trace(`${correlationID}: Run Validation on required fields `);
    await requiredFieldValidator(
      ['locationID'],
      Object.keys(req.params),
      correlationID,
    );
    logger.trace(`${correlationID}: Validation Successful`);
    logger.trace(`${correlationID}: >>>> Call to locationManagementService.permanentDelete()`);
    const responseData = await locationManagementService.permanentDelete(locationID, correlationID);

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

exports.locations = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`${correlationID}: <<<<<<-- Started get hospitals flow -->>>>>>`);
    logger.trace(`${correlationID}: >>>> Call to  locationManagementService.locations()`);
    const responseData = await locationManagementService.locations(correlationID);

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

exports.location = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`${correlationID}: <<<<<<-- Started  get single location flow -->>>>>>`);
    logger.trace(`${correlationID}: Run Validation on required fields `);
    const { locationID } = req.params;
    logger.trace(`${correlationID}: Run Validation on required fields `);
    await requiredFieldValidator(
      ['locationID'],
      Object.keys(req.params),
      correlationID,
    );
    logger.trace(`${correlationID}: Validation Successful`);
    logger.trace(`${correlationID}: >>>> Call to locationManagementService.location()`);
    const responseData = await locationManagementService.location(locationID, correlationID);

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

exports.getDistance = async (req, res) => {
  const correlationID = req.header('x-correlation-id');
  try {
    logger.trace(`${correlationID}: <<<<<<-- Started  get distance flow -->>>>>>`);
    logger.trace(`${correlationID}: Run Validation on required fields `);
    const { locationID } = req.params;
    logger.trace(`${correlationID}: Run Validation on required fields `);
    await requiredFieldValidator(
      ['locationID'],
      Object.keys(req.params),
      correlationID,
    );
    logger.trace(`${correlationID}: Validation Successful`);
    logger.trace(`${correlationID}: >>>> Call to locationManagementService.getDistance()`);
    const responseData = await locationManagementService.getDistance(locationID, correlationID);

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