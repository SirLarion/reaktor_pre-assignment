const axios = require('axios');
const express = require('express'); 
const cors = require('cors');

const config = require('./utils/config');

const app = express();

const PORT = config.PORT;
const URL = config.URL;

app.use(cors());

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
                        if(dataPoints.length) {
                            dataPoints.forEach(d => availabilities.set(d['id'].toLowerCase(), d['DATAPAYLOAD']));
                        }
                    }
                    catch(err) {
                        // TODO: Better error response
                        console.log(res);
                        console.log(err);
                    }
                });
                joinedData = products.map(product => {
                    return {...product, availability: availabilities.get(product.id)}
                });
                resolve(joinedData);
            });
    });
}

app.get('/:category/initial', (request, response) => {
    const category = request.params.category;
    response.header("Access-Control-Allow-Origin", "*");
    axios.get(`${URL}/products/${category}`)
        .then(res => {
            const products = res.data;
            const manufacturers = parseManufacturers(products);
            joinAPIdata(products, manufacturers)
                .then(data => {
                    internalCache[category] = data;
                    response.json(data)
                });
        })
        .catch(err => {
            response.status(404).end();
        });
});
 
app.get('/:category', (request, response) => {
    const category = request.params.category;
    if(internalCache[category].length) {
        response.json(internalCache[category]);
    }
    else {
        response.status(404).end();
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
