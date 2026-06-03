const rideModel = require('../models/ride.model');
const mapService = require('./map.service');
const crypto = require('crypto');


async function getFare(origin, destination) {

    try {

        if (!origin || !destination) {
            throw new Error("origin and dest not provided");
        }

        // Get origin coordinates
        const originData = await mapService.getCoordinates(origin);

        // Get destination coordinates
        const destinationData = await mapService.getCoordinates(destination);

        const originLat = originData.lat;
        const originLon = originData.lon;

        const destinationLat = destinationData.lat;
        const destinationLon = destinationData.lon;

        // OSRM Route API
        const osrmResponse = await mapService.OsrmRes({ originLon, originLat, destinationLon, destinationLat });

        const route = osrmResponse.data.routes[0];

        const distanceInKM = (route.distance / 1000).toFixed(2);

        const durationInMinutes = (route.duration / 60).toFixed(2);



        const baseFare = {
            car: 30,
            auto: 25,
            bike: 20
        }
        const farePerKm = {
            car: 22,
            auto: 13,
            bike: 8
        }

        const fare = {
            car: Math.round((baseFare.car + (distanceInKM * farePerKm.car))),
            auto: Math.round((baseFare.auto + (distanceInKM * farePerKm.auto))),
            bike: Math.round((baseFare.bike + (distanceInKM * farePerKm.bike))),
        }
        
        return fare;


    } catch (error) {
        console.log(error);
        
        throw error;

    }
}

module.exports.getFare = getFare;

function generateOTP() {

    // Generates number between 100000 and 999999
    const otp = crypto.randomInt(100000, 1000000);

    return otp.toString();
}


module.exports.createRide = async ({ user, pickUp, destination, vehicleType , distance}) => {

    if (!user || !pickUp || !destination || !vehicleType) {
        throw new Error('all fields are required');
    }

    const fare = await getFare(pickUp, destination);



    const ride = rideModel.create({
        user: user,
        pickUp: pickUp,
        otp : generateOTP(),
        destination: destination,
        fare: fare[vehicleType],
        distance:distance
    })

    return ride;
}




