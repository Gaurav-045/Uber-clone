const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const captainSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength :[3, 'Captain name must be at least 3 characters long']
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address.'],
        minlength :[5, 'Email must be at least 5 characters long']
    },
    vehicle:{
        color:{
            type: String,
            required: true
        },
        model:{
            type: String,
            required: true
        },
        licensePlate:{
            type: String,
            required: true,
            unique: true
        }
    }
});

captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({
        _id: this._id,
    }, process.env.JWT_SECRET, { expiresIn: '7 days' });

    return token;
}




const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel;
