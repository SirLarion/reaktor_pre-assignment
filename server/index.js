const axios = require('axios');
const express = require('express'); 
const cors = require('cors');

const config = require('./utils/config');

const app = express();

const PORT = config.PORT;
const URL = config.URL;

app.use(cors());

const categoryNames = ['gloves', 'facemasks', 'beanies'];

let internalCache = {
    gloves: [],
    facemasks: [],
    beanies: []
}

function parseManufacturers(products) {
    const manufacturers = new Set();
    products.forEach(p => {
        manufacturers.add(p['manufacturer']);
    });
    return manufacturers;
}

function getProductData(category) {
    return axios.get(`${URL}/products/${category}`);
}

function getAvailabilityData(manufacturers) {
    const resPromises = [];

    manufacturers.forEach(manu => {
        const res = axios.get(`${URL}/availability/${manu}`);
        resPromises.push(res);
    });

    return Promise.all(resPromises)
}

/* Get avalability of products corresponding to each manufacturer in 'manufacturers' 
 * and merge with product data */
function joinAPIdata(products, manufacturers) {
    // TODO: Rejection?
    return new Promise((resolve, reject) => {
        let joinedData = [];
        let availabilities = new Map();

        getAvailabilityData(manufacturers)
            .then(responses => {
                responses.forEach(res => {
                    try {
                        const dataPoints = res.data.response;
                        // Check for array truthiness before attempting iteration
                        dataPoints.forEach(d => availabilities.set(d['id'].toLowerCase(), d['DATAPAYLOAD']));
                    }
                    catch(err) {
                        // TODO: Better error response
                        //console.log(err);
                    }
                });
                joinedData = products.map(product => {
                    return {...product, availability: availabilities.get(product.id)}
                });
                resolve(joinedData);
            });
    });
}

function makeExternalAPIcall() {
    // TODO: Catch errors
    for(i = 0; i < categoryNames.length; i++) {
        const category = categoryNames[i];
        getProductData(category)
            .then(res => {
                const products = res.data;
                const manufacturers = parseManufacturers(products);
                joinAPIdata(products, manufacturers)
                    .then(data => {
                        internalCache[category] = data;
                    });
            });
    }
    setTimeout(makeExternalAPIcall, 300000); 
}
 
app.get('/:category/:sindex/:eindex', (request, response) => {

    const category   = request.params.category;
    const startIndex = request.params.sindex;
    const endIndex   = request.params.eindex;

    const resData = internalCache[category].slice(startIndex, endIndex);

    response.header("Access-Control-Allow-Origin", "*");

    if(resData.length && resData.length > 0) {
        response.json(resData);
    }
    else {
        response.status(404).end();
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    makeExternalAPIcall();
});
