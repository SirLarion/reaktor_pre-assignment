/* Very simple caching functionality */

let internalCache = {}

function getCache() { return internalCache; }
function setCache(property, value) { internalCache[property] = value; }

module.exports = {
    getCache,
    setCache
}
