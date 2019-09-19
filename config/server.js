//IMPORT MIDDLEWARE
const express = require("express")
const cors = require('cors')
const helmet = require('helmet')

//SETUP
const server = express()

//DEFINE ROUTES
const routes = [
    require('../api/routes/users'),
    require('../api/routes/units'),
    require('../api/routes/equipment'),
    require('../api/routes/exercises'),
]

//PRE MIDDLEWARE
server.use(helmet())        //security
server.use(cors())          //ensures front and back end can work on the same machine
server.use(express.json())  //json all the things!

//START ROUTES
routes.forEach(route => server.use('/api', route))

//POST MIDDLEWARE
//:aint got nothin'

//API IS ONLINE NOTIFICATION
server.get('/', (req, res) =>
    res.send('You want data? Try going somewhere else for that.')
)

module.exports = server