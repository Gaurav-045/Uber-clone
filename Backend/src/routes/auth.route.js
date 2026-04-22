const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authController = require('../controllers/user.controller');




router.post('/register', [
    body('name.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please use a valid email address.').isLength({min:5}).withMessage('Email must be at least 5 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
], authController.register);




module.exports = router;