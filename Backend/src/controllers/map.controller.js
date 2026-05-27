const express = require('express');

const mapService = require('../services/map.service');



const getCords1 = async(req,res) =>{

     try {

        const { place } = req.query;

        if (!place) {
            return res.status(400).json({
                success: false,
                message: 'Place is required'
            });
        }

        const data = await mapService.getCords2({place});
        
        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Location not found'
            });
        }

        res.status(200).json({
            success: true,
            coordinates: {
                latitude: data[0].lat,
                longitude: data[0].lon
            },
            address: data[0].display_name
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }

}




const getDisTime = async (req,res) =>{
    
    try {

        const { origin, destination } = req.query;

        if (!origin || !destination) {
            return res.status(400).json({
                success: false,
                message: 'Origin and destination are required'
            });
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
        const osrmResponse = await mapService.OsrmRes({originLon,originLat,destinationLon,destinationLat});

        const route = osrmResponse.data.routes[0];

        const distanceInKM = (route.distance / 1000).toFixed(2);

        const durationInMinutes = (route.duration / 60).toFixed(2);

        res.status(200).json({
            success: true,
            origin,
            destination,
            distanceInKM,
            durationInMinutes
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}


module.exports = {getCords1,getDisTime};