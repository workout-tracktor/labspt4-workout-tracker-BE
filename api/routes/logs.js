//ENDPOINT: /api

//IMPORTS
const express = require('express')
// const remove = require('../helpers/remove')

//MIDDLEWARE
const {data, schema, id, prepare} = require('../middleware')
const {request} = require('../middleware/requests')

//SETUP
const router = express.Router()
const route_name = 'log'

//ROUTES
//create
//:add a new workout
router.post(`/${route_name}`, data, schema, prepare, request, async (req, res) => {
    res.status(201).json(req.data.response)
})

//GET
//:get a single workout fitting a set of requirements
router.get(`/${route_name}`, data, request, async (req, res) => {
    res.status(201).json(req.data.response)
})
//:get all users fitting a set of requirements
router.get(`/${route_name}s`, data, request, async (req, res) => {
    res.status(201).json(req.data.response)
})

//UPDATE
//:
router.put(`/${route_name}`, data, id, request, async (req, res) => {
    res.status(201).json(req.data.response)
})

//DELETE
//:
router.delete(`/${route_name}`, data, id, request, async (req, res) => {
    res.status(201).json(req.data.response)
})
router.delete(`/${route_name}s`, data, request, async (req, res) => {
    res.status(201).json(req.data.response)
})

//EXPORTS
module.exports = router