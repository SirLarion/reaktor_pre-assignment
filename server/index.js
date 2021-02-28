
const config   = require('./utils/config');
const app = require('./app');
const handlers = require('./handlers');

const PORT = config.PORT;

/*
 * The backend for 'ClothesListingApp'. Works as a gateway API for
 * https://bad-api-assignment.reaktor.com/v2/ API.
 *
 * When started up, the API requests all the data from the external API 
 * and parses + caches it internally. After this it requests new data every minute.
 */

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    handlers.makeExternalAPIcall();
});
