//IMPORTS
const express = require("express")
const cors = require('cors')
const helmet = require('helmet')
//routes
const routes_users = require('../api/routes/users')
<<<<<<< HEAD
=======
const routes_workouts = require('../api/routes/workouts')
const routes_logs = require('../api/routes/logs')
>>>>>>> master

//SETUP
const server = express()

//GLOBAL MIDDLEWARE
server.use(helmet())        //security
server.use(cors())          //ensures front and back end can work on the same machine
server.use(express.json())  //json all the things!

//ROUTES
server.use('/api/users', routes_users)
<<<<<<< HEAD
=======
server.use('/api/workouts', routes_workouts)
server.use('/api/logs', routes_logs)
>>>>>>> master

//API IS ONLINE NOTIFICATION
server.get('/', (req, res) =>
    res.send('You want data? Try going somewhere else for that.')
)

module.exports = server