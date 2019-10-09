//SETUP
const express = require("express")
const server = express()

//IMPORT AND USE MIDDLEWARE
server.use(require('cors')())
server.use(require('helmet')())
server.use(express.json())  //json all the things!

//APP Middleware
//:Add these the order you want to use them
const warez = [
    require('../middleware/app/data'),
    require('../middleware/app/constraints'),
    require('../middleware/app/encrypt'),
    require('../middleware/app/prepare_req'),
    require('../middleware/app/make_req'),
    require('../middleware/app/send_resp')
]
warez.forEach(ware => server.use(ware))

//API IS ONLINE NOTIFICATION
server.get('/', (req, res) =>
    res.send('You want data? Try going somewhere else for that.')
)

module.exports = server