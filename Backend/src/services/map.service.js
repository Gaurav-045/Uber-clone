const axios = require('axios');


module.exports.getCords2 = async({place}) =>{
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



module.exports.getCoordinates = async(place) => {

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


module.exports.OsrmRes = async ({originLon,originLat,destinationLon,destinationLat}) =>{
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



module.exports.getSuggestions = async ({ input }) => {

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
};