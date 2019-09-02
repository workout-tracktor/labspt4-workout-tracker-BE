module.exports = {
    development: {
      client: 'sqlite3',
      connection: {
        database: 'liftquest',
        filename: './dev.sqlite3'
      }
    },
    staging: {
      client: 'postgresql',
      connection: {
        database: 'liftquest',
        user:     'username',
        password: 'password'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    },
    production: {
      client: 'postgresql',
      connection: {
        database: 'listquest',
        user:     'username',
        password: 'password'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    }
  }
  