//SETUP
const express = require("express")
const server = express()
const router = express.Router()

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

//ALL ROUTES
server.use('/api/', router.all('*', warez, (req, res) => res.status(200).json(req.data.response)))

//API IS ONLINE NOTIFICATION
server.get('/', (req, res) => console.log('yup'))

module.exports = server