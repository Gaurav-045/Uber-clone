const mongoose = require('mongoose');


const blacklistedSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        required: true,
        expiresIn: 24 * 60 * 60 // Expire after 1 day
    }
})


const blacklistedModel = mongoose.model('BlacklistedToken', blacklistedSchema);
module.exports = blacklistedModel;