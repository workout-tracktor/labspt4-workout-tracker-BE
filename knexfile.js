<<<<<<< HEAD
require('dotenv').config()

module.exports = {
  development: {
    client: 'postgres',
    connection: {
      host: process.env.DB_HOST,
=======
require('dotenv').config();


module.exports = {


  development: {
    client: 'postgres',
    connection: {
>>>>>>> master
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  staging: {
    client: 'postgres',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  production: {
    client: 'postgres',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
<<<<<<< HEAD
}
=======
};
>>>>>>> master
