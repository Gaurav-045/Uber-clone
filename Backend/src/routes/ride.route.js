const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

const rideController = require('../controllers/ride.controller');


router.post('/create-ride',
    authMiddleware.authMiddleware1,
    body('pickUp').isString().isLength({min:3}).withMessage('invalid pickUp location'),
    body('destination').isString().isLength({min:3}).withMessage('invalid destination'),
    body('vehicleType').isString().isIn(['car','auto','bike']).withMessage('Invalid vehicleType')
    ,rideController.createRide);

module.exports = router;