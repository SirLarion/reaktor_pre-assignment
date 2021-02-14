const axios = require('axios');
const express = require('express'); 
const cors = require('cors');

const config = require('./utils/config');

const app = express();

const PORT = config.PORT;
const URL = config.URL;

app.use(cors());

function parseManufacturers(products) {
    const manufacturers = new Set();
    products.forEach(p => {
        manufacturers.add(p['manufacturer']);
    });
    return manufacturers;
}

function getAvailabilityData(manufacturers) {
    let resPromises = [];

    manufacturers.forEach(manu => {
        const res = axios.get(`${URL}/availability/${manu}`);
        resPromises.push(res);
    });

    return Promise.all(resPromises)
}

function joinAPIdata(products, manufacturers) {
    return new Promise((resolve, reject) => {
        let joinedData = [];
        let availabilities = new Map();

        getAvailabilityData(manufacturers)
            .then(responses => {
                responses.forEach(res => {
                    console.log(res);
                    try {
                        const dataPoints = res.data.response;
                        dataPoints.forEach(d => availabilities.set(d['id'].toLowerCase(), d['DATAPAYLOAD']));
                    }
                    catch(err) {
                        console.log('Burjaborja');
                    }
                });
                joinedData = products.map(product => {
                    return {...product, availability: availabilities.get(product.id)}
                });
                resolve(joinedData);
            });
    });
}
 
app.get('/:category', (request, response) => {
    const category = request.params.category;
    response.header("Access-Control-Allow-Origin", "*");
    axios.get(`${URL}/products/${category}`)
        .then(res => {
            const products = res.data;
            const manufacturers = parseManufacturers(products);
            joinAPIdata(products, manufacturers)
                .then(data => response.json(data));
        })
        .catch(err => {
            response.status(404).end();
        });

    //const products = getAPIdata(category);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
