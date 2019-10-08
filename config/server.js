//IMPORT MIDDLEWARE
const express = require("express")
const cors = require('cors')
const helmet = require('helmet')

//SETUP
const server = express()

//IMPORTED MIDDLEWARE
server.use(helmet())        //security
server.use(cors())          //ensures front and back end can work on the same machine
server.use(express.json())  //json all the things!

//APP Middleware
//:Add these the order you want to use them
const warez = [
    require('../middleware/app/data'),
    require('../middleware/app/constraints'),
    require('../middleware/app/encrypt'),
    require('../middleware/app/prepare_req'),
]
warez.forEach(ware => server.use(ware))

//API IS ONLINE NOTIFICATION
server.get('/', (req, res) =>
    res.send('You want data? Try going somewhere else for that.')
)

module.exports = server