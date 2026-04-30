const express = require('express');
const captainModel = require('../models/captain.model');
const {validationResult} = require('express-validator');
const captainService = require('../services/captain.service');
const cookie = require('cookie');



const registerCaptain = async(req,res)=>{

    console.log('Incoming request body:', req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log('Validation Errors:', errors.array());
        return res.status(400).json({errors:errors.array()});
    }

    try{
        const {name,email,password,vehicle} = req.body;

        const isCaptainExists = await captainModel.findOne({email});

        if(isCaptainExists){
            throw new Error('Captain already exists with this email');
        }

        const hashPassword = await captainModel.hashPassword(password);

        const captain = await captainService.createCaptain({
            name,
            email,
            password: hashPassword,
            licensePlate: vehicle.licensePlate,
            model: vehicle.model,
            vehicleType: vehicle.vehicleType,
            capacity: vehicle.capacity,
            color: vehicle.color
        })

        const token = captain.generateAuthToken();

       res.cookie('token', token, {httpOnly:true});
        res.status(201).json({message: 'Captain created successfully', captain});



    }catch(err){
        console.error('Full error:', err);
        res.status(400).json({error: err.message, details: err});
    }
}


module.exports = {registerCaptain};








