const express = require('express');
const userService = require('../services/user.service');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');



const register = async(req,res) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }


    try{
        const {name,email,password} = req.body;

        const isUserExist = await userModel.findOne({email});

        if(isUserExist){
            throw new Error('User already exists with this email');
        }

        const hashPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstname: name.firstname,
            lastname: name.lastname,
            email,
            password: hashPassword
        });

        const token = user.generateAuthToken();

        res.cookie('token', token, { httpOnly: true });

        res.status(201).json({message: 'User created successfully', user});

    }catch(err){
        console.error(err.message);
        res.status(400).json({error: err.message});
    }
}


module.exports = {
    register
};