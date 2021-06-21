const express = require('express');

const router = express.Router();
const locationController = require('../controllers/location');

router.post('/location/add', locationController.add);
router.put('/location/:locationID', locationController.updateLocation);
router.delete('/location/soft/:locationID', locationController.softDeleteLocation);
router.delete('/location/hard/:locationID', locationController.permanentDeleteLocation);
router.get('/locations', locationController.locations);
router.get('/location/:locationID', locationController.location);
router.get('/distance/:locationID', locationController.getDistance);

module.exports = router;
