const express = require('express');
const userService = require('../services/user.service');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

const blacklistModel = require('../models/blacklist.model');



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

const login = async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email,password} = req.body;

    try{
        const user = await userModel.findOne({email}).select('+password');

        if (!user){
            res.status(400).json({error: 'Invalid email or password'});
            return;
        }
        const isMatch = await user.comparePassword(password);

        if (!isMatch){
            res.status(401).json({error: 'Invalid email or password'});
            return;
        }

        const token = user.generateAuthToken();

        res.cookie('token',token, {httpOnly: true});

        res.status(201).json({message: 'Login successful', token, user});


    }catch(err){
        console.error(err.message);
        res.status(400).json({error: err.message});
    }
}

const getProfile = async(req,res) => {
    res.status(200).json({user: req.user});
}

const logout = async(req,res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token){
        return res.status(400).json({error: 'No token provided.'});
    }

    try {
        await blacklistModel.create({
            token:token
        });

        res.clearCookie('token');
       return  res.status(201).json({message: 'Logout successful'});

    } catch (err) {
        console.error(err.message);
        return res.status(400).json({error: err.message});
    }

}

module.exports = {
    register,login,getProfile,logout
};
