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
const {data, schema, id, prepare, encrypt} = require('../middleware')
const {conversion_therapy} = require('../middleware/auth0')
const {request} = require('../middleware/requests')

//SETUP
const router = express.Router()

//ROUTES

//CREATE
//:add a new user
router.post('/user', conversion_therapy, data, schema, encrypt, prepare, request, async (req, res) => {
    res.status(201).json(req.data.response)
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
router.put('/user', data, id, request, async (req, res) => {
    res.status(200).json(req.data.response)
})

//DELETE
//:remove user by id
router.delete('/user', data, id, request, async (req, res) => {
    res.status(200).json(req.data.response)
})
//:remove all users
router.delete('/users', data, request, async (req, res) => {
    // console.log('>>>', req.data)
    res.status(200).json(req.data.response)
})

//EXPORTS
module.exports = router