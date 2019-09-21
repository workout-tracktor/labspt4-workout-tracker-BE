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
const {data, required, unique, id, prepare, encrypt} = require('../middleware')
const {conversion_therapy} = require('../middleware/auth0')

//MODELS
const modelUsers = require('../models/users')

//SETUP
const router = express.Router()

//ROUTES
//create
//:new user for crap0
router.post('/user/register', conversion_therapy, data, required, unique, encrypt, prepare, async (req, res) => {
    const user = await modelUsers.add(req.data.prepared)
    try {
        user
        ?   res.status(201).json(user)
        :   res.status(404).json({error: `User couldn't be added.`})
    } catch (err) {
        console.log('err', err)
        res.status(500).json(err)
    }
})

//:add a new user
router.post('/user', data, required, unique, encrypt, prepare, async (req, res) => {
    try {
        const user = await modelUsers.add(req.data.prepared)
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

//update
//:
router.put('/user', data, id, async (req, res) => {
    // console.log(req.data)
    try {
        const user = await modelUsers.update_by_id(req.data.id, req.data.body)
        // console.log('user', user)
        if(user) res.status(201).json(user)
        else res.status(404).json({error: `Couldn't update user.`})
    } catch(err) {
        res.status(500).json(err)
    }
})

//delete
//:
router.delete('/user', data, id, async (req, res) => {
    try {
        const user = await modelUsers.remove_by_id(req.data.id, req.data.body)
        if(user) res.status(201).json({success: `User has been terminated.`})
        else res.status(404).json({error: `Couldn't update user.`})
    } catch(err) {
        res.status(500).json(err)
    }
})

//EXPORTS
module.exports = router