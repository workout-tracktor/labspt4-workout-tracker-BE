//ENDPOINT: /api

//IMPORTS
const express = require('express')
// const remove = require('../helpers/remove')

//MIDDLEWARE
const {schema, id, prepare} = require('../middleware')
const {request} = require('../middleware/requests')

//SETUP
const router = express.Router()
const route_name = 'workout'

//ROUTES
//create
//:add a new workout
router.post(`/${route_name}`, schema, prepare, request, async (req, res) => {
    res.status(201).json(req.data.response)
})

//GET
//:get a single workout fitting a set of requirements
router.get(`/${route_name}`, request, async (req, res) => {
    res.status(201).json(req.data.response)
})
//:get all users fitting a set of requirements
router.get(`/${route_name}s`, request, async (req, res) => {
    res.status(201).json(req.data.response)
})

//UPDATE
//:
router.put(`/${route_name}`, id, request, async (req, res) => {
    res.status(201).json(req.data.response)
})

//DELETE
//:
router.delete(`/${route_name}`, id, request, async (req, res) => {
    res.status(201).json(req.data.response)
})
router.delete(`/${route_name}s`, request, async (req, res) => {
    res.status(201).json(req.data.response)
})

//EXPORTS
module.exports = router