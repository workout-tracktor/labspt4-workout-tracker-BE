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
//:add a new exercise
router.post('/exercise', data, schema, prepare, request, async (req, res) => {
    res.status(201).json(req.data.response)
})

//GET
//:get a single exercise fitting a set of requirements
router.get('/exercise', data, request, async (req, res) => {
    res.status(201).json(req.data.response)
})
//:get all users fitting a set of requirements
router.get('/exercises', data, request, async (req, res) => {
    res.status(201).json(req.data.response)
})

//UPDATE
//:
router.put('/exercise', data, id, request, async (req, res) => {
    res.status(201).json(req.data.response)
})

//DELETE
//:
router.delete('/exercise', data, id, request, async (req, res) => {
    res.status(201).json(req.data.response)
})
router.delete('/exercises', data, request, async (req, res) => {
    res.status(201).json(req.data.response)
})

//EXPORTS
module.exports = router