const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');


const authMiddleware1 = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token){
        return res.status(401).json({error: 'Access denied. No token provided.'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded._id);

        if (!user){
            return res.status(401).json({error: 'Invalid token. User not found.'});
        }

        req.user = user;

        next();

    }catch(err){
        console.error(err.message);
        res.status(400).json({error: 'Invalid token.'});
    }
}



module.exports = {authMiddleware1};
