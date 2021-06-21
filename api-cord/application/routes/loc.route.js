const express = require('express');

const router = express.Router();

const locServiceController = require('../controllers/location-controller');

// location routes
router.post('/location/add', locServiceController.add);
router.put('/location/:locationID', locServiceController.update);
router.delete('/location/soft/:locationID', locServiceController.softDelete);
router.delete('/location/hard/:locationID', locServiceController.hardDelete);
router.get('/locations', locServiceController.all);
router.get('/location/:locationID', locServiceController.single);
router.get('/distance/:locationID', locServiceController.calcDist);

module.exports = router;
