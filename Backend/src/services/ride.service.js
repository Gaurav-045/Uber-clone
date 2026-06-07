const rideModel = require('../models/ride.model');
const { findByIdAndUpdate } = require('../models/user.model');
const mapService = require('./map.service');
const crypto = require('crypto');


async function getFare(origin, destination) {

    try {

        if (!origin || !destination) {
            throw new Error("origin and dest not provided");
        }


        const originData = await mapService.getCoordinates(origin);


        const destinationData = await mapService.getCoordinates(destination);

        const originLat = originData.lat;
        const originLon = originData.lon;

        const destinationLat = destinationData.lat;
        const destinationLon = destinationData.lon;


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

    const otp = crypto.randomInt(100000, 1000000);

    return otp.toString();
}


module.exports.createRide = async ({ user, pickUp, destination, vehicleType, distance }) => {

    if (!user || !pickUp || !destination || !vehicleType) {
        throw new Error('all fields are required');
    }

    const fare = await getFare(pickUp, destination);



    const ride = rideModel.create({
        user: user,
        pickUp: pickUp,
        otp: generateOTP(),
        destination: destination,
        fare: fare[vehicleType],
        distance: distance
    })

    return ride;
}

module.exports.acceptRideService = async ({ rideId, captainId }) => {
    try {
        if (!rideId || !captainId) {
            throw new Error('ride id or captain id required');
        }

        await rideModel.findByIdAndUpdate({ _id: rideId }, {
            status: 'accepted',
            captain: captainId
        })

        const ride = await rideModel.findOne({
            _id: rideId
        }).populate('user').populate('captain').select('+otp');

        if (!ride) {
            throw new Error('ride not found');
        }

        return ride;

    } catch (err) {
        console.log(err);
    }
}

module.exports.confirmOtp = async ({ rideId, otp }) => {

    try {
        console.log("ride id in service : ", rideId);
        if (!rideId || !otp) {
            throw new Error('rideId or otp is empty');
        }

        const ride1 = await rideModel.findById(rideId).select('+otp');

        console.log(ride1.otp, '    ', otp);

        if (ride1.otp !== otp) {
            throw new Error('otp doesnt match');
        }
        console.log("........otp matched........")
        const ride = await rideModel.findByIdAndUpdate({ _id: rideId },
            {
                status: 'ongoing'
            },
            {
                returnDocument: 'after'
            }
        ).populate('user').populate('captain');

        return ride;

    } catch (err) {
        console.log(err);
    }
}


module.exports.finish = async (rideId) => {
    try {
        if (!rideId) {
            throw new Error('rideId not provided');
        }

        const data = await rideModel.findByIdAndDelete(rideId);

        return data;

    } catch (err) {
        console.log(err);
    }
}