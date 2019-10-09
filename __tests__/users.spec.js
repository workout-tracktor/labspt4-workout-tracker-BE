const request = require('supertest');
const server =require('../config/server.js');
const db = require('../data/dbConfig.js');

process.env.NODE_ENV = 'testing';

const dbConfig = require('../knexfile.js')[process.env.NODE_ENV];
const knex = require('knex')(dbConfig);


describe('GET /users', () => {
    // cleanup for db
    beforeEach(done => {
        knex.migrate.rollback()
          .then(() => {
            knex.migrate.latest()
            .then(() => {
              done()
            })
          }).catch(err => done(err))
    })

    it('should return all users in the db', async () => {
        // add user
        const user = [
            {
                id: 1,
                user_id: "1",
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