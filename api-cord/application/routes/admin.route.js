const express = require('express');

const router = express.Router();

const adminUsrMgtController = require('../controllers/admin-service-controller');

// location routes
router.post('/location/ref/set', adminUsrMgtController.setRefLoc);

module.exports = router;
