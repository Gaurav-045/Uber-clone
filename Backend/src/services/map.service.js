const axios = require('axios');
const captainModel = require('../models/captain.model');


const getCords2 = async ({ place }) => {
    const response = await axios.get(
        'https://nominatim.openstreetmap.org/search',
        {
            params: {
                q: place,
                format: 'json',
                limit: 1
            },
            headers: {
                'User-Agent': 'UberClone/1.0'
            }
        }
    );

    const data = response.data;

    return data;
}



const getCoordinates = async (place) => {

    const response = await axios.get(
        'https://nominatim.openstreetmap.org/search',
        {
            params: {
                q: place,
                format: 'json',
                limit: 1
            },
            headers: {
                'User-Agent': 'UberClone/1.0'
            }
        }
    );

    return response.data[0];
}



const getDistance = async (origin, destination) => {
    const originData = await getCoordinates(origin);


    const destinationData = await getCoordinates(destination);

    const originLat = originData.lat;
    const originLon = originData.lon;

    const destinationLat = destinationData.lat;
    const destinationLon = destinationData.lon;


    const osrmResponse = await OsrmRes({ originLon, originLat, destinationLon, destinationLat });

    return osrmResponse.data.routes[0];
}

const OsrmRes = async ({ originLon, originLat, destinationLon, destinationLat }) => {
    const osrmResponse = await axios.get(
        `https://router.project-osrm.org/route/v1/driving/${originLon},${originLat};${destinationLon},${destinationLat}`,
        {
            params: {
                overview: 'false'
            }
        }
    );

    return osrmResponse;
}



const getSuggestions = async ({ input }) => {
    try {
        const response = await axios.get(
            'https://nominatim.openstreetmap.org/search',
            {
                params: {
                    q: input,
                    format: 'json',
                    addressdetails: 1,
                    limit: 5
                },
                headers: {
                    'User-Agent': 'UberClone/1.0'
                }
            }
        );

        const suggestions = response.data.map((item) => ({
            name: item.display_name,
            latitude: item.lat,
            longitude: item.lon
        }));

        return suggestions;
    } catch (error) {

        if (error.response?.status === 429) {
            throw new Error('Too many requests. Please try again later2.');
        }

        throw error;
    }
};

const getNearCaptain = async ({ longitude, latitude }) => {
    const captains = await captainModel.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                },
                $maxDistance: 5000
            }
        }
    });

    return captains;
}

module.exports = {getCoordinates,OsrmRes,getDistance,getNearCaptain,getSuggestions,getCords2};