const express = require('express');
const { validationResult } = require('express-validator');
const rideService = require('../services/ride.service');
const mapService = require('../services/map.service');
const { sendToSoc } = require('../../socket');

module.exports.createRide = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickUp, destination, vehicleType } = req.body;

    try {
        const ride = await rideService.createRide({
            user: req.user._id,
            pickUp,
            destination,
            vehicleType
        })

        res.status(201).json(ride);

        const pickUpCords = await mapService.getCoordinates(pickUp);

        const longitude = pickUpCords.lon;
        const latitude = pickUpCords.lat;

        const captains = await mapService.getNearCaptain({longitude,latitude});

        
        
        ride.otp ="";

        captains.map((cap) =>{
            sendToSoc(cap.socketId,{
                event:'new-ride',
                data:ride
            })
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    }
}


module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { pickUp, destination } = req.query;

        const fare = await rideService.getFare(pickUp, destination);

        return res.status(200).json({ fare: fare });

    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}