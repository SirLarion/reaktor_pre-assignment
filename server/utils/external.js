const axios = require('axios');

const config = require('./config');

const URL = config.URL;

// Send GET request for products of 'category'
function getProductData(category) {
    return axios.get(`${URL}/products/${category}`)
        .catch(err => {
            console.log(`Product API unavailable for category: ${category}`);
        });
}

// Send GET requests for the availabilities of the given 
// set of manufacturers
function getAvailabilityData(manufacturers) {
    const resPromises = [];

    // Put all promises in an array so we can wait for them all
    // to resolve before handling availabilities
    manufacturers.forEach(manu => {
        const res = axios.get(`${URL}/availability/${manu}`)
            .catch(err => {
                console.error(`Availability API unavailable for manufacturer: ${manu}`);
            });
        resPromises.push(res);
    });

    return Promise.all(resPromises)
}

module.exports = {
    getProductData,
    getAvailabilityData
}
