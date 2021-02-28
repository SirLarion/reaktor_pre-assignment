/* Very simple caching functionality */

let internalCache = {}

function getCache() { return internalCache; }
function setCache(cacheObject) { internalCache = cacheObject; }

module.exports = {
    getCache,
    setCache
}
