const express = require('express');
const { validationResult } = require('express-validator');
const rideService = require('../services/ride.service');
const mapService = require('../services/map.service');
const rideModel = require('../models/ride.model');
const { sendToSoc } = require('../../socket');

module.exports.createRide = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickUp, destination, vehicleType } = req.body;


    try {

        const route = await mapService.getDistance(pickUp, destination);

        const distance = (route.distance / 1000).toFixed(2);

        const ride = await rideService.createRide({
            user: req.user._id,
            pickUp,
            destination,
            vehicleType,
            distance
        })

        console.log(ride);

        res.status(201).json(ride);

        const pickUpCords = await mapService.getCoordinates(pickUp);

        const longitude = pickUpCords.lon;
        const latitude = pickUpCords.lat;

        const captains = await mapService.getNearCaptain({ longitude, latitude });

        ride.otp = "";

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

        captains.map((cap) => {
            sendToSoc(cap.socketId, {
                event: 'new-ride',
                data: rideWithUser
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


module.exports.acceptRide = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { rideId, captainId } = req.body;

        const ride = await rideService.acceptRideService({ rideId, captainId });

        sendToSoc(ride.user.socketId, {
            event: 'accept-ride',
            data: ride
        })
    } catch (err) {
        console.log('an error : ', err);
    }
}


module.exports.checkOtp = async (req,res) =>{
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({erros: errors.array()});
    }

    try{

    const {rideId,otp} = req.query;


    const ride = await rideService.confirmOtp({rideId,otp});

    sendToSoc(ride.user.socketId,{
        event:'otp-confirm',
        data:ride
    });

    res.status(200).json(ride);

    }catch(err){
        console.log(err);
    }
}


module.exports.finish = async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try{

        const {rideId} = req.body;

        const data = await rideService.finish(rideId);

        console.log(data);

        // sendToSoc()

        return res.status(200).json(data);

    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}


