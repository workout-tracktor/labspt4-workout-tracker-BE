//ENDPOINT: /api

//IMPORTS
const express = require('express')
// const remove = require('../helpers/remove')

//MIDDLEWARE
const {data, schema, id, prepare, encrypt} = require('../middleware')

//MODELS
const modelExercises = require('../models/exercises')

//SETUP
const router = express.Router()

//ROUTES
//create
//:add a new exercise
router.post('/exercise', data, required, unique, prepare, async (req, res) => {
    try {
        const exercise = await modelExercises.add(req.data.prepared)
        exercise
        ?   res.status(201).json(exercise)
        :   res.status(404).json({error: `exercise couldn't be added.`})
    } catch (err) {
        res.status(500).json(err)
    }
})

//:get a single exercise fitting a set of requirements
router.get('/exercise', data, async (req, res) => {
    try {
        const exercise = await modelExercises.get_by(req.data.query)
        if(exercise) res.status(200).json(exercise)
        else res.status(404).json({error: `The database does not have exercise.`})
    } catch(err) {
        res.status(500).json(err)
    }
})

//:get all users fitting a set of requirements
router.get('/exercises', data, async (req, res) => {
    try {
        const exercises = await modelExercises.get_all_by(req.data.query)
        if(exercises.length > 0) res.status(200).json(exercises)
        else res.status(404).json({error: `No exercises found.`}) //include query
    } catch(err) {
        res.status(500).json(err)
    }
})

//update
//:
router.put('/exercise', data, id, async (req, res) => {
    // console.log(req.data)
    try {
        const exercise = await modelExercises.update_by_id(req.data.id, req.data.body)
        // console.log('exercise', exercise)
        if(exercise) res.status(201).json(exercise)
        else res.status(404).json({error: `Couldn't update exercise.`})
    } catch(err) {
        res.status(500).json(err)
    }
})

//delete
//:
router.delete('/exercise', data, id, async (req, res) => {
    try {
        const exercise = await modelExercises.remove_by_id(req.data.id, req.data.body)
        if(exercise) res.status(201).json({success: `exercise has been terminated.`})
        else res.status(404).json({error: `Couldn't update exercise.`})
    } catch(err) {
        res.status(500).json(err)
    }
})

//EXPORTS
module.exports = router