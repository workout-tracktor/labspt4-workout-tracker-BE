const request = require('supertest');

const server =require('../config/server.js');


describe('server.js', () => {
    it('should set the test env', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });
});

describe('GET /', () => {

    it('should return 200', async () => {
        const res = await request(server).get('/');
        expect(res.status).toBe(200);
    });

    it('should return an object', async () => {
        const res = await request(server).get('/');
        expect(res.body).toEqual({});
    });
});