const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');




router.post('/register', [
    body('name.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('name.lastname').isLength({min:3}).withMessage('Last name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please use a valid email address.').isLength({min:5}).withMessage('Email must be at least 5 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
], authController.register);


router.post('/login',[
    body('email').isEmail().withMessage('Please use a valid email address.').isLength({min:5}).withMessage('Email must be at least 5 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
], authController.login);


router.get('/profile',authMiddleware.authMiddleware1, authController.getProfile);

router.get('/logout',authController.logout);


module.exports = router;