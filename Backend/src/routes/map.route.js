const express = require('express');
const axios = require('axios');
const mapController = require('../controllers/map.controller');
const router = express.Router();

router.get('/get-coordinates', mapController.getCords1 );


router.get('/get-distance-time', mapController.getDisTime);


router.get('/autocomplete', mapController.getAutoComplete);


module.exports = router;