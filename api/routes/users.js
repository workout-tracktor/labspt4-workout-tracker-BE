//ENDPOINT: /api/users

//IMPORTS
const express = require('express')
const misc = require('../helpers/misc')

//MIDDLEWARE

//MODELS
const modelUsers = require('../models/users')

//SETUP
const router = express.Router()

//ROUTES
//create
//:add a new user
router.post('/', async (req, res) => {
    try {
        const user = await modelUsers.add(req.body)
        console.log('user', user)
        user
        ?   res.status(201).json(user)
        :   res.status(404).json({error: `User couldn't be added.`})
    } catch (err) {
        res.status(500).json(err)
    }
})

//get
router.get('/', async (req, res) => {
    try {
        console.log('made it here')
        const users = await modelUsers.get_all()
        if(users.length > 0) {
            res.status(200).json(users)
        } else
            res.status(404).json({error: `No users found.`})
    } catch (err) {
        res.status(500).json(err)
    }
})

//EXPORTS
module.exports = router