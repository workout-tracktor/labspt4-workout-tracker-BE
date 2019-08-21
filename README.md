# labspt4-workout-tracker-BE

## How to set up postgres database

1. Login into PgAdmin 4 and create a new database under PostgreSQL (default username is postgres). You can also
make a new user instead of postgres through Postgres's command line tools

2. After running yarn, create a .env with these variables 

    * DB_NAME => this is the name of the database you created
    * DB_USER => Your postgres username. The default is postgres
    * DB_PASSWORD => The password for your postgres username
    * DB_ENV => This is your environment (development, staging and production). By default, your envionment will be development

3. Run knex migrate:latest, knex seed:run. Your database should be run and running

