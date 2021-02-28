const handlers = require('../handlers');
const external = require('../utils/external');
const cache    = require('../utils/cache');
const categoryNames = require('../utils/constants').categories;


const gloves    = require('../utils/__fixtures__/mockGloves.json');
const facemasks = require('../utils/__fixtures__/mockFacemasks.json');
const beanies   = require('../utils/__fixtures__/mockBeanies.json');

const ippal     = require('../utils/__fixtures__/mockIppal.json');
const abiplos   = require('../utils/__fixtures__/mockAbiplos.json');
const okkau     = require('../utils/__fixtures__/mockOkkau.json');
const umpante   = require('../utils/__fixtures__/mockUmpante.json');
const niksleh   = require('../utils/__fixtures__/mockNiksleh.json');
const juuran    = require('../utils/__fixtures__/mockJuuran.json');

const joined    = require('../utils/__fixtures__/mockJoined.json');


// Helper; checks if two sets are equal (i.e. the sets contain each other)
function setEquality(setA, setB) {
    if (setA.size !== setB.size) return false;
    for (let a of setA) if (!setB.has(a)) return false;
    return true;
}

const productData = {
    'gloves': gloves,
    'facemasks': facemasks,
    'beanies': beanies
}

const availabilityData = {
    'ippal': ippal,
    'abiplos': abiplos,
    'okkau': okkau,
    'umpante': umpante,
    'niksleh': niksleh,
    'juuran': juuran
}

let mockCache = {}


const manufacturers = new Set(['ippal', 'abiplos', 'okkau', 'umpante', 'niksleh', 'juuran']);

/* Mock API calls to control the data output */

jest.spyOn(external, 'getAvailabilityData')
    .mockImplementation(() => {
        return new Promise((resolve, reject) => {
            resolve([
                { data: ippal },
                { data: abiplos },
                { data: okkau },
                { data: umpante },
                { data: niksleh },
                { data: juuran }
            ]);
        });
    });

jest.spyOn(external, 'getProductData')
    .mockImplementation(category => new Promise((resolve, reject) => {
        resolve({ data: productData[category] });
    }));

/* Mock calls to cache to control its state */ 

jest.spyOn(cache, 'getCache')
    .mockImplementation(() => mockCache);

jest.spyOn(cache, 'setCache')
    .mockImplementation(newCache => mockCache = newCache);



// TESTS //

describe('parseManufacturers', () => {
    categoryNames.forEach(cat => {
        it(`should identify manufacturers from ${cat}`, () => {
            const resultSet = handlers.parseManufacturers(productData[cat]);
            expect(setEquality(manufacturers, resultSet)).toBeTruthy();
        });
    });
});

describe('joinAPIdata', () => {
    it('should produce joined data correctly', async () => {
        const testJoined = await handlers.joinAPIdata(productData['gloves'], manufacturers);
        const realJoined = joined['gloves'];
        let flag = true;
        for(let i = 0; i < 100; i++) {
            flag = flag && JSON.stringify(testJoined[i]) === JSON.stringify(realJoined[i]);
        }
        expect(flag).toEqual(true);
    });
});

describe('makeExternalAPIcall', () => {
    it('should populate the cache correctly', () => {
        
    });
});
