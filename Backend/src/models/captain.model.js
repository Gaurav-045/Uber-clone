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
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false
    },
    socketId:{
        type: String
    },
    vehicle:{
        color:{
            type: String,
            required: true
        },
        capacity:{
            type: Number,
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
        },
        vehicleType:{
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto']
        },
        location:{
            lat:{
                type: Number
            },
            lon:{
                type: Number
            }
        }
    }
});

captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({
        _id: this._id,
    }, process.env.JWT_SECRET, { expiresIn: '7 days' });

    return token;
}
captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}


const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel;
