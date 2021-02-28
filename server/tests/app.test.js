const supertest = require('supertest');

const app = require('../app');
const cache = require('../utils/cache');
const categoryNames = require('../utils/constants').categories;
const mockCache = require('../utils/__fixtures__/mockCache.json');

const reqSupertest = supertest(app);

// Mock the getCache function to control the state of the 'cache'
const getMockCache = jest.spyOn(cache, 'getCache')
    .mockImplementation(() => mockCache);

// Standard get requests for all categoryNames
categoryNames.forEach(cat => {
    describe(`GET ${cat}`, () => {

        test(`/${cat}/0/100 status = 200`, async () => {
            const res = await reqSupertest.get(`/${cat}/0/100`);
            expect(res.status).toEqual(200);
        });
        test(`/${cat}/0/100 type = /.json/`, async () => {
            const res = await reqSupertest.get(`/${cat}/0/100`);
            expect(res.type).toMatch(/.json/);
        });
        test(`/${cat}/0/100 data length = 100`, async () => {
            const res = await reqSupertest.get(`/${cat}/0/100`);
            expect(res.body.length).toBe(100);
        });
        test(`/${cat}/300/400 data length = 100`, async () => {
            const res = await reqSupertest.get(`/${cat}/300/400`);
            expect(res.body.length).toBe(100);
        });
        test(`/${cat}/0/100 product type = '${cat}'`, async () => {
            let flag = true;
            const res = await reqSupertest.get(`/${cat}/0/100`);
            res.body.forEach(product => {
                flag = flag | product.type === `${cat}`;
            });
            expect(flag).toBeTruthy();
        });
    });
});

// Edge case GET requests where behaviour is expected to be different 
describe('GET edge cases', () => {
    test('/gloves/5800/5900 data length = 7', async () => {
        const res = await reqSupertest.get('/gloves/5800/5900');
        expect(res.body.length).toBe(7);
    });
    test('/gloves/5900/6000 data length = undefined, status = 204', async () => {
        const res = await reqSupertest.get('/gloves/5900/6000');
        expect(res.body.length).toBeFalsy();
        expect(res.status).toBe(204);
    });
    test('/facemasks/5500/5600 data length = 54', async () => {
        const res = await reqSupertest.get('/facemasks/5500/5600');
        expect(res.body.length).toBe(54);
    });
    test('/facemasks/5600/5700 data length = undefined, status = 204', async () => {
        const res = await reqSupertest.get('/facemasks/5600/5700');
        expect(res.body.length).toBeFalsy();
        expect(res.status).toBe(204);
    });
    test('/beanies/7300/7400 data length = 67', async () => {
        const res = await reqSupertest.get('/beanies/7300/7400');
        expect(res.body.length).toBe(67);
    });
    test('/beanies/7400/7500 data length = undefined, status = 204', async () => {
        const res = await reqSupertest.get('/beanies/7400/7500');
        expect(res.body.length).toBeFalsy();
        expect(res.status).toBe(204);
    });
});

// GET request when cache is empty
describe('Unsuccessful GET', () => {
    
    it('should respond with status = 404', async () => {
        getMockCache.mockReturnValueOnce({});
        const res = await reqSupertest.get('/facemasks/2000/2100');
        expect(res.status).toBe(404);
    });
});
