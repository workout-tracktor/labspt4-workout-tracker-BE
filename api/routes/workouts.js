//ENDPOINT: /api

//IMPORTS
const express = require('express')
// const remove = require('../helpers/remove')

//MIDDLEWARE
const {data, required, unique, id, prepare, encrypt} = require('../middleware')
const {exercise_ids} = require('../middleware/workouts')

//MODELS
const modelWorkouts = require('../models/workouts')

//SETUP
const router = express.Router()

//ROUTES
//create
//:add a new workout
router.post('/workout', data, required, unique, exercise_ids, prepare, async (req, res) => {
    try {
        const workout = await modelWorkouts.add(req.data.prepared)
        workout
        ?   res.status(201).json(workout)
        :   res.status(404).json({error: `workout couldn't be added.`})
    } catch (err) {
        res.status(500).json(err)
    }
})

//:get a single workout fitting a set of requirements
router.get('/workout', data, async (req, res) => {
    try {
        const workout = await modelWorkouts.get_by(req.data.query)
        if(workout) res.status(200).json(workout)
        else res.status(404).json({error: `The database does not have workout.`})
    } catch(err) {
        res.status(500).json(err)
    }
})

//:get all users fitting a set of requirements
router.get('/workouts', data, async (req, res) => {
    try {
        const workouts = await modelWorkouts.get_all_by(req.data.query)
        if(workouts.length > 0) res.status(200).json(workouts)
        else res.status(404).json({error: `No workouts found.`}) //include query
    } catch(err) {
        res.status(500).json(err)
    }
})

//update
//:
router.put('/workout', data, id, async (req, res) => {
    // console.log(req.data)
    try {
        const workout = await modelWorkouts.update_by_id(req.data.id, req.data.body)
        // console.log('workout', workout)
        if(workout) res.status(201).json(workout)
        else res.status(404).json({error: `Couldn't update workout.`})
    } catch(err) {
        res.status(500).json(err)
    }
})

//delete
//:
router.delete('/workout', data, id, async (req, res) => {
    try {
        const workout = await modelWorkouts.remove_by_id(req.data.id, req.data.body)
        if(workout) res.status(201).json({success: `workout has been terminated.`})
        else res.status(404).json({error: `Couldn't update workout.`})
    } catch(err) {
        res.status(500).json(err)
    }
})

//EXPORTS
module.exports = router