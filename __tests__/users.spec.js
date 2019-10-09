const request = require('supertest');
const server =require('../config/server.js');
const db = require('../data/dbConfig.js');
const knex = require('knex');

const pg = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        database: 'testing',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
    searchPath: ['knex', 'public'],
  });
//const Users = require('../api/helpers/usersHelper.js');

describe('GET /users', () => {
    // cleanup for db
    afterEach(async () => {
        // knex.raw('SET foreign_key_checks = 0');
        // knex('logs').truncate();        

        pg('users').truncate();  
      
        // await db('users').truncate();
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

// describe('getUserById', () => {
//     // cleanup for db
//     afterEach(async () => {
//         await db('users').truncate();
//     });

//     it('finds a user by id', async () => {

//         let res = await request(server)
//         .post("/register")
//         .send({
//           id: "1",
//           firstname: "Matt",
//           lastname: "Smith",
//           username: "Msmith9",
//           password: "test",
//           email: "smith5w@gmail.com",
//           role: "teacher"
//         });

//         let token = res.body.token;

//         await db('users').insert([
//             { 
//                 id: "2",
//                 firstname: "Lisa",
//                 lastname: "Jones",
//                 username: "lijones",
//                 password: "test",
//                 email: "jones@gmail.com",
//                 role: "teacher" 
//             },
//             { 
//                 id: "3",
//                 firstname: "Jack",
//                 lastname: "Jones",
//                 username: "jjones",
//                 password: "test",
//                 email: "jjones@gmail.com",
//                 role: "teacher"
//             }
//         ]);

//         const res2 = await request(server).get('/users/2').set('authorization', `${token}`);

//         expect(res2.body.email).toEqual("jones@gmail.com");
//     });