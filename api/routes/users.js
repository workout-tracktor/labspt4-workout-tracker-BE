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
const {request} = require('../middleware/requests')

//MODELS
// const modelUsers = require('../models/users')
const {add, get, get_all, update, remove, remove_all} = require('../models')

//SETUP
const router = express.Router()
const tbl = 'users'

//ROUTES

//CREATE
//:add a new user
router.post('/user', conversion_therapy, data, required, encrypt, prepare, request, async (req, res) => {
    res.status(201).json(req.data.response)
    // try {
    //     const user = await add('users', req.data.prepared)
    //     user
    //     ?   res.status(201).json(user)
    //     :   res.status(404).json({error: `User couldn't be added.`})
    // } catch (err) {
    //     res.status(500).json(err)
    // }
})

//GET
//:get a single user fitting a set of requirements
router.get('/user', data, request, (req, res) => {
    res.status(200).json(req.data.response)
})
//:get all users fitting a set of requirements
router.get('/users', data, request,  async (req, res) => {
    res.status(200).json(req.data.response)
})

//UPDATE
//:update user by id
router.put('/user', data, id, async (req, res) => {
    try {
        const user = await update(tbl, req.data.id, req.data.body)
        if(user) res.status(201).json(user)
        else res.status(404).json({error: `Couldn't update user.`})
    } catch(err) {
        res.status(500).json(err)
    }
})

//DELETE
//:remove user by id
router.delete('/user', data, id, async (req, res) => {
    try {
        const user = await remove(tbl, req.data.id, req.data.body)
        if(user) res.status(201).json({success: `User has been terminated.`})
        else res.status(404).json({error: `User has survived.`})
    } catch(err) {
        res.status(500).json(err)
    }
})
//:remove all users
router.delete('/users', async (req, res) => {
    try {
        await remove_all(tbl)
        res.status(666).json({success: `Everyone has been terminated.`})
    } catch(err) {
        res.status(500).json({error: `There were survivors.`})
    }
})

//EXPORTS
module.exports = router