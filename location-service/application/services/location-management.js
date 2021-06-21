// Business logic comes in here
const Location = require('../models/Location.model'); // import location model
const fs = require("fs"); // library to access defaultLocConfig.json
const path = require('path');
const logger = require('../utils/logger'); // logger
const Distance = require('geo-distance');


exports.add = async (locationObj, correlationID) => {
  const newLocation = new Location(locationObj);
  await newLocation.save();
  logger.trace(`${correlationID}: <<<< Exiting locationManagementService.add()`);
  const response = {};
  response.data = newLocation;
  response.message = 'Location added successfully';
  response.success = true;
  return response;
};

exports.update = async (locationID, locationObj, correlationID) => {
  try {
    const updateLocation = await Location.findOneAndUpdate(
      { _id: locationID }, locationObj, { new: true },
    );
    logger.trace(`${correlationID}: <<<< Exiting locationManagementService.update()`);
    const response = {};
    response.data = updateLocation;
    response.message = 'Location updated successfully';
    response.success = true;
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

// soft delete locaton
exports.softDelete = async (adminID, correlationID) => {
  try {
    await Location.findOneAndUpdate(
      { _id: adminID },{deleted: true}
    );
    logger.trace(`${correlationID}: <<<< Exiting locationManagementService.softDelete()`);
    const response = {};
    response.data = {};
    response.message = 'Location added to recycle bin';
    response.success = true;
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

// soft delete locaton
exports.permanentDelete = async (locationID, correlationID) => {
  try {
    await Location.findOneAndDelete(
      { _id: locationID }
    );
    logger.trace(`${correlationID}: <<<< Exiting locationManagementService.hardDeleteAdmin()`);
    const response = {};
    response.data = {};
    response.message = 'Location deleted Permanently';
    response.success = true;
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

// get all locations
exports.locations = async (correlationID) => {
  try {
    const limit = 20;
    // limit the number of responses returned
    // TODO: pagination on response
    const locations = await Location.find({}).limit(limit);
    logger.trace(`${correlationID}: <<<< Exiting locationManagementService.locations()`);
    const response = {};
    response.data = {locations, responseSize: locations.length, maxSize: limit};
    response.message = 'Locations retrieved successfully';
    response.success = true;
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

// get single location
exports.location = async (locationID, correlationID) => {
  try {
    const location = await Location.findOne({ _id: locationID });
    logger.trace(`${correlationID}: <<<< Exiting locationManagementService.location()`);
    const response = {};
    response.data = location;
    response.message = 'Location retrieved successfully';
    response.success = true;
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

// config reference location. This sets the default reference location
exports.setRefLoc = async (locationObj, correlationID) => {
  const refLoc = JSON.stringify({geolocation: [locationObj.lng, locationObj.lat]});
  const fileLoc = path.resolve(process.cwd(), 'defaultLocConfig.json');
  fs.writeFile(fileLoc, refLoc, 'utf8', function (err) {
    if (err) {
      logger.trace(`${correlationID}: <<<< An error occured while writing JSON Object to File.`);
      throw new Error(err)
    }
    
  });  

    logger.trace(`${correlationID}: <<<< Exiting locationManagementService.setRefLoc()`);
    const response = {};
    response.data = {};
    response.message = 'Reference Location configured successfully';
    response.success = true;
    return response;
};


exports.getDistance = async (locationID, correlationID) => {
  // get geolocation of specified id from db
  const location = await Location.findOne({_id: locationID});
  if(!location) throw new Error('Location not found')
  // geo-distance api requires an object of the form {lat:number, lon:number}
  // creating object from location data
  const geolocation = {lat:location.geolocation.coordinates[1], lon:location.geolocation.coordinates[0]};

  // fetching our reference location from config file
  const fileLoc = path.resolve(process.cwd(), 'defaultLocConfig.json');
  let refLoc = JSON.parse(fs.readFileSync(fileLoc, 'utf8'))
  refLoc = {lat:refLoc.geolocation[1], lon:refLoc.geolocation[0]}

  // computing distance between locations
  const distanceBtwLocs = (Distance.between(geolocation, refLoc)).human_readable();
    logger.trace(`${correlationID}: <<<< Exiting locationManagementService.setRefLoc()`);
    const response = {};
    response.data = distanceBtwLocs;
    response.message = 'Distance computed successfully';
    response.success = true;
    return response;
};