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
//create
//:add a new workout
router.post('/workout', data, schema, prepare, request, async (req, res) => {
    res.status(201).json(req.data.response)
})

//GET
//:get a single workout fitting a set of requirements
router.get('/workout', data, request, async (req, res) => {
    res.status(201).json(req.data.response)
})
//:get all users fitting a set of requirements
router.get('/workouts', data, request, async (req, res) => {
    res.status(201).json(req.data.response)
})

//UPDATE
//:
router.put('/workout', data, id, request, async (req, res) => {
    res.status(201).json(req.data.response)
})

//DELETE
//:
router.delete('/workout', data, id, request, async (req, res) => {
    res.status(201).json(req.data.response)
})
router.delete('/workouts', data, request, async (req, res) => {
    res.status(201).json(req.data.response)
})

//EXPORTS
module.exports = router