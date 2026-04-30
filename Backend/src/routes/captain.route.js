const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller');




router.post('/register',[
    body('name').isLength({min: 3}).withMessage('Captain name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please use a valid email address.').isLength({min: 5}).withMessage('Email must be at least 5 characters long'),
    body('vehicle.model').notEmpty().withMessage('Vehicle model is required'),
    body('vehicle.licensePlate').notEmpty().withMessage('License plate is required'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type must be either car, bike, or auto'),
    body('vehicle.color').notEmpty().withMessage('Vehicle color is required')
], captainController.registerCaptain)





module.exports = router;