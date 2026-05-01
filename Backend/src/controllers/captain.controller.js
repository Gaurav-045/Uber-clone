const express = require('express');
const captainModel = require('../models/captain.model');
const {validationResult} = require('express-validator');
const captainService = require('../services/captain.service');
const blacklistedModel = require('../models/blacklist.model');
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


const login = async(req,res) =>{
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        console.log("errors : ",errors.array());
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {email,password} = req.body;

    try{

        const captain = await captainModel.findOne({email}).select('+password');
        if(!captain){
            return res.status(400).json({message:"user doesn't exist with this email"})
        }

        const passMatch = await captain.comparePassword(password);

        if(!passMatch){
            return res.status(400).json({message:"enter valid email or password"})
        }

        const token = captain.generateAuthToken();

        res.cookie('token',token,{httpOnly:true});

        res.status(201).json({message:'login succesful',captain});


    }catch(error){
        console.error(err.message);
        return res.status.json({error: error.message})
    }

}


const getCaptain = async(req,res) =>{
    const captain = req.captain;
    res.status(201).json({message:'user profile :',captain});
}


const logout = async(req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(400).json({message:'unauthorized'});
    }
    try{
    await blacklistedModel.create({token:token});

    res.clearCookie('token');
    res.status(201).json({message:'user logout succesfully..'});

    }catch(err){
        return res.status(400).json({error:err.message,details:err.array});
    }

}


module.exports = {registerCaptain,login,getCaptain,logout};








