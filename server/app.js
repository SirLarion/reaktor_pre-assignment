const express = require('express'); 
const cors    = require('cors');
const path    = require('path');

const cache = require('./utils/cache');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

/* Process requests to data of 'category' starting from 'sindex' and
 * ending in 'eindex' */
app.get('/:category/:sindex/:eindex', (request, response) => {

    const category   = request.params.category;
    const startIndex = request.params.sindex;
    const endIndex   = request.params.eindex;

    const resData = cache.getCache()[category];

    // The external API doesn't have this header set so we need to
    // enable it or the frontend will throw a CORS error
    response.header("Access-Control-Allow-Origin", "*");

    // If the cache contains data to send, take the correct slice of it
    // and send it. 
    if(resData) {
        const slice = resData.slice(startIndex, endIndex);

        //Respond with 204 instead of 404 if the slice is out of
        // range as the frontend needs to know whether there's NO data or NO MORE data
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

// The path in use when the app is deployed 
app.get('/reaktor', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = app;

