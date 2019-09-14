//ENDPOINT: /api

//IMPORTS
const express = require('express')
const remove = require('../helpers/remove')

//MIDDLEWARE
const mw = require('../middleware/users')

//MODELS
const modelUsers = require('../models/users')

//SETUP
const router = express.Router()

//ROUTES
//create
//:add a new user
router.post('/user', async (req, res) => {
    try {
        const user = await modelUsers.add(req.body)
        // console.log('user', user)
        user
        ?   res.status(201).json(user)
        :   res.status(404).json({error: `User couldn't be added.`})
    } catch (err) {
        res.status(500).json(err)
    }
})

//:get all users fitting a set of requirments
router.get('/users', mw.cleanreq, async (req, res) => {
    // console.log('query', req.query)
    try {
        res.status(200).json({one: req.params.one, two: req.params.two})
    } catch(err) {
        res.status(500).json(err)
    }
})

//EXPORTS
module.exports = router