const express = require('express');
const router = express.Router();
const { body , query} = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

const rideController = require('../controllers/ride.controller');


router.post('/create-ride',
    authMiddleware.authMiddleware1,
    body('pickUp').isString().isLength({min:3}).withMessage('invalid pickUp location'),
    body('destination').isString().isLength({min:3}).withMessage('invalid destination'),
    body('vehicleType').isString().isIn(['car','auto','bike']).withMessage('Invalid vehicleType')
    ,rideController.createRide);

router.get('/get-fare',
    authMiddleware.authMiddleware1,
    query('pickUp').isString().isLength({min:3}).withMessage('invalid pickUp location'),
    query('destination').isString().isLength({min:3}).withMessage('invalid destination'),
    rideController.getFare
);

router.post('/accept',
    authMiddleware.captainMiddleware,
    body('rideId').notEmpty().withMessage('provide ride Id'),
    body('captainId').notEmpty().withMessage('provide captain Id'),
    rideController.acceptRide
);

router.get('/confirm',
    query('rideId').notEmpty().withMessage('rideId should not be empty'),
    query('otp').isString().withMessage('otp should not be empty'),
    rideController.checkOtp
)

router.post('/finish',
    body('rideId').isMongoId().withMessage('give mongo url'),
    rideController.finish
)

module.exports = router;