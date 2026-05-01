const captainModel = require('../models/captain.model');



module.exports.createCaptain = async({name, email, password,licensePlate, model, vehicleType, capacity, color}) => {
    console.log('Received data:', { name, email, password, licensePlate, model, vehicleType, capacity, color });

    if(!name || !email || !password || !licensePlate || !model || !vehicleType || !capacity || !color) {
        throw new Error('Please provide all required fields');
    }


    const captain = await captainModel.create({
        name,
        email,
        password,
        vehicle: {
            licensePlate,
            model,
            vehicleType,
            capacity,
            color
        }
    })

    return captain;

}