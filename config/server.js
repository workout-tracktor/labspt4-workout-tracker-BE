//SETUP
const express = require("express")
const server = express()

//IMPORT AND USE MIDDLEWARE
server.use(require('cors')())
server.use(require('helmet')())
server.use(express.json())  //json all the things!

//APP Middleware
//:Add these the order you want to use them


// const warez = [
//     require('../middleware/app/data'),
//     require('../middleware/app/constraints'),
//     require('../middleware/app/encrypt'),
//     require('../middleware/app/prepare_req'),
//     require('../middleware/app/make_req'),
//     require('../middleware/app/send_resp')
// ]

m1 = require('../middleware/app/data')
m2 = require('../middleware/app/constraints')
m3 = require('../middleware/app/encrypt')
m4 = require('../middleware/app/prepare_req')
m5 = require('../middleware/app/make_req')
m6 = require('../middleware/app/send_resp')

// const express = require('express')
const router = express.Router()
router.get('*', m1, m2, m3, m4, m5, m6, (req, res) => {
    console.log('----', req.data.response)
    try {
        res.status(200).json(req.data.response)
    } catch(err) {
        console.log(err)
    }
})

server.use('/api/', router)

//API IS ONLINE NOTIFICATION
server.get('/', (req, res) => console.log('yup'))

module.exports = server