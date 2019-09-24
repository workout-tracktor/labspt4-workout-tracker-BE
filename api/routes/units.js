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
const {data, schema, id, prepare} = require('../middleware')
const {request} = require('../middleware/requests')

//SETUP
const router = express.Router()

//ROUTES

//CREATE
//:add a new unit
router.post('/unit', data, schema, prepare, request, async (req, res) => {
    res.status(201).json(req.data.response)
})

//GET
//:get a single unit fitting a set of requirements
router.get('/unit', data, request, (req, res) => {
    res.status(200).json(req.data.response)
})
//:get all units fitting a set of requirements
router.get('/units', data, request,  async (req, res) => {
    res.status(200).json(req.data.response)
})

//UPDATE
//:update unit by id
router.put('/unit', data, id, request, async (req, res) => {
    res.status(200).json(req.data.response)
})

//DELETE
//:remove unit by id
router.delete('/unit', data, id, request, async (req, res) => {
    res.status(200).json(req.data.response)
})
//:remove all units
router.delete('/units', data, request, async (req, res) => {
    // console.log('>>>', req.data)
    res.status(200).json(req.data.response)
})

//EXPORTS
module.exports = router