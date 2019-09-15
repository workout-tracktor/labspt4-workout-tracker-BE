// __   __  _______  _______  ______           ______    _______  __   __  _______  _______  _______ 
//|  | |  ||       ||       ||    _ |         |    _ |  |       ||  | |  ||       ||       ||       |
//|  | |  ||  _____||    ___||   | ||   ____  |   | ||  |   _   ||  | |  ||_     _||    ___||  _____|
//|  |_|  || |_____ |   |___ |   |_||_ |____| |   |_||_ |  | |  ||  |_|  |  |   |  |   |___ | |_____ 
//|       ||_____  ||    ___||    __  |       |    __  ||  |_|  ||       |  |   |  |    ___||_____  |
//|       | _____| ||   |___ |   |  | |       |   |  | ||       ||       |  |   |  |   |___  _____| |
//|_______||_______||_______||___|  |_|       |___|  |_||_______||_______|  |___|  |_______||_______|

//ENDPOINT: /api

//IMPORTS
const express = require('express')
// const remove = require('../helpers/remove')

//MIDDLEWARE
const {data, required, unique} = require('../middleware')

//MODELS
const modelUsers = require('../models/users')

//SETUP
const router = express.Router()

//ROUTES
//create
//:add a new user
router.post('/user', data, required, unique, async (req, res) => {
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

//:get a single user fitting a set of requirements
router.get('/user', data, async (req, res) => {
    try {
        const user = await modelUsers.get_by(req.data.query)
        if(user) res.status(200).json(user)
        else res.status(404).json({error: `No user found.`})
    } catch(err) {
        res.status(500).json(err)
    }
})

//:get all users fitting a set of requirements
router.get('/users', data, async (req, res) => {
    try {
        const users = await modelUsers.get_all_by(req.data.query)
        if(users.length > 0) res.status(200).json(users)
        else res.status(404).json({error: `No users found.`}) //include query
    } catch(err) {
        res.status(500).json(err)
    }
})

//EXPORTS
module.exports = router