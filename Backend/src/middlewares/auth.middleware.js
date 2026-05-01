const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const blacklistedModel = require('../models/blacklist.model');
const bcrypt = require('bcrypt');
const captainModel = require('../models/captain.model');


const authMiddleware1 = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token){
        return res.status(401).json({message: 'Access denied. No token provided.'});
    }

    const isBlacklisted = await blacklistedModel.findOne({token:token});

    if(isBlacklisted){
        return res.status(401).json({message:'please login or register first'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded._id);

        if (!user){
            return res.status(401).json({message: 'Invalid token. User not found.'});
        }

        req.user = user;

        next();

    }catch(err){
        console.error(err.message);
        res.status(400).json({message: 'Invalid token.'});
    }
}

const captainMiddleware = async(req,res,next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message:'token not found'});
    }

    const isBlacklisted = await blacklistedModel.findOne({token:token});

    if(isBlacklisted){
        return res.status(401).json({message:'you logouted'});
    }

    try{

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const captain = await captainModel.findById(decoded._id);

        req.captain = captain;

        next();

    }catch(error){
        console.error(err.message);
        return res.status(400).json({message:"error occured"});
    }
}

module.exports = {authMiddleware1, captainMiddleware};
