//IMPORTS
const express = require("express")
const cors = require('cors')
const helmet = require('helmet')
//routes
const routes = {
    users: require('../api/routes/users'),
    units: require('../api/routes/units'),
    equipments: require('../api/routes/equipment')
}
// const routes_users = require('../api/routes/users')
// const routes_units = require('../api/routes/users')

//SETUP
const server = express()

//GLOBAL MIDDLEWARE
server.use(helmet())        //security
server.use(cors())          //ensures front and back end can work on the same machine
server.use(express.json())  //json all the things!

//ROUTES
server.use('/api', routes.users)
server.use('/api', routes.units)
server.use('/api', routes.equipments)

//API IS ONLINE NOTIFICATION
server.get('/', (req, res) =>
    res.send('You want data? Try going somewhere else for that.')
)

module.exports = server