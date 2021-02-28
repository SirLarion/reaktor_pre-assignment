const external = require('./utils/external');
const cache = require('./utils/cache');
const categoryNames = require('./utils/constants').categories;


// Helper; reads all unique manufacturer names from the product data
function parseManufacturers(products) {
    const manufacturers = new Set();
    products.forEach(p => {
        manufacturers.add(p['manufacturer']);
    });
    return manufacturers;
}

/* Get avalability of products corresponding to each manufacturer in 'manufacturers' 
 * and merge with product data */
function joinAPIdata(products, manufacturers) {
    return new Promise((resolve, reject) => {
        let joinedData = [];
        let availabilities = new Map(); // product id => product availability

        // Convert set to array for consistent iterability
        let listManus = [...manufacturers];

        // TODO: Store availability data for manufacturers whose data has been
        // retrieved already during current cycle
        external.getAvailabilityData(listManus)
            .then(responses => {
                for(i = 0; i < responses.length; i++) {
                    const res = responses[i];
                    const manu = listManus[i];
                    if(res) {
                        try {
                            const dataPoints = res.data.response;
                            dataPoints.forEach(d => availabilities.set(d['id'].toLowerCase(), d['DATAPAYLOAD']));
                        }
                        catch(err) {
                            console.log(`Availability data incomplete for manufacturer: ${manu}`);
                        }
                    }
                    else console.log(`Availability data not found for manufacturer: ${manu}`);
                }
                // Iterate through products and set availabilities corresponding to product ids
                joinedData = products.map(product => {
                    return {...product, availability: availabilities.get(product.id)}
                });
                resolve(joinedData);
            });
    });
}

/*
 * Get all products of all categories, link the datapoints to their corresponding
 * availability data and cache the data internally. When users
 * make requests for categories, we can return data from the cache
 */
function makeExternalAPIcall() {
    let internalCache = cache.getCache();
    for(i = 0; i < categoryNames.length; i++) {
        const category = categoryNames[i];
        // Get products of 'category'
        external.getProductData(category)
            .then(res => {
                try {
                    const products = res.data;
                    const manufacturers = parseManufacturers(products);
                    // Get availabilites for each manufacturer and
                    // combine with the corresponding products
                    joinAPIdata(products, manufacturers)
                        .then(data => {
                            internalCache[category] = data;
                        })
                }
                catch(err) {}
            })
    }
    cache.setCache(internalCache);

    // Update the internal cache every minute
    setTimeout(makeExternalAPIcall, 60000); 
}

module.exports = { 
    parseManufacturers,
    joinAPIdata,
    makeExternalAPIcall 
}
