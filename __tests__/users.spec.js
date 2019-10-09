const request = require('supertest');
const server =require('../config/server.js');
const db = require('../data/dbConfig.js');
const knex = require('knex');


describe('GET /users', () => {
    // cleanup for db
    afterEach(async () => {
        // knex.raw('SET foreign_key_checks = 0');
        await db('users').truncate();
        // knex.raw('SET foreign_key_checks = 1');
    });

    it('should return all users in the db', async () => {
        await db('users').truncate();

        // add user
        const user = [
            {
                id: 2,
                user_id: "2",
                username: "jones",
                password: "test",
                email: "lijones@gmail.com",
                created: "1570585236381",
                updated: "1570585236381"
            }
        ];

        await db('users').insert(user);

        const res = await request(server).get('/api/users');
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
    })

});