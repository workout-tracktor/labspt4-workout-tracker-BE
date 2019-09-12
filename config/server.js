//IMPORTS
const express = require("express")
const cors = require('cors')
const helmet = require('helmet')
//routes

//SETUP
const server = express()

//GLOBAL MIDDLEWARE
server.use(helmet())        //security
server.use(cors())          //ensures front and back end can work on the same machine
server.use(express.json())  //json all the things!

//ROUTES

//API IS ONLINE NOTIFICATION
server.get('/', (req, res) =>
    res.send('You want data? Try going somewhere else for that.')
)

module.exports = server