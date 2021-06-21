const express = require('express');

const router = express.Router();
const admin = require('../controllers/admin.config');

router.post('/location/ref/set', admin.set);


module.exports = router;
