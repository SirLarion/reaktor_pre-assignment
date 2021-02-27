const axios = require('axios');
const express = require('express'); 
const cors = require('cors');
const path = require('path');

const config = require('./utils/config');

const app = express();

const PORT = config.PORT;
const URL = config.URL;

app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));


const categoryNames = ['gloves', 'facemasks', 'beanies'];

let internalCache = {}

function parseManufacturers(products) {
    const manufacturers = new Set();
    products.forEach(p => {
        manufacturers.add(p['manufacturer']);
    });
    return manufacturers;
}

function getProductData(category) {
    return axios.get(`${URL}/products/${category}`)
        .catch(err => {
            console.log(`Product API unavailable for category: ${category}`);
        });
}

function getAvailabilityData(manufacturers) {
    const resPromises = [];

    manufacturers.forEach(manu => {
        const res = axios.get(`${URL}/availability/${manu}`)
            .catch(err => {
                console.log(`Availability API unavailable for manufacturer: ${manu}`);
            });
        resPromises.push(res);
    });

    return Promise.all(resPromises)

}

/* Get avalability of products corresponding to each manufacturer in 'manufacturers' 
 * and merge with product data */
function joinAPIdata(products, manufacturers) {
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
                        console.log('Availability data not found');
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
                try {
                    const products = res.data;
                    const manufacturers = parseManufacturers(products);
                    joinAPIdata(products, manufacturers)
                        .then(data => {
                            internalCache[category] = data;
                        })
                }
                catch(err) {}
            })
    }
    setTimeout(makeExternalAPIcall, 60000); 
}
 
app.get('/:category/:sindex/:eindex', (request, response) => {

    const category   = request.params.category;
    const startIndex = request.params.sindex;
    const endIndex   = request.params.eindex;

    const resData = internalCache[category];

    response.header("Access-Control-Allow-Origin", "*");

    if(resData) {
        const slice = resData.slice(startIndex, endIndex);
        if(slice.length > 0) {
            response.json(slice);
        }
        else {
            response.status(204).end();
        }
    }
    else {
        response.status(404).end();
    }
});

app.get('/reaktor', function(req,res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    makeExternalAPIcall();
});
