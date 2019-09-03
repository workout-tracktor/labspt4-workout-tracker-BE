//ENDPOINT: /api/workouts

//IMPORTS
const express = require('express')
const misc = require('../helpers/misc')

//MIDDLEWARE
// const mwWorkouts = require('../middleware/workouts')

//MODELS
const modelWorkouts = require('../models/workouts')

//SETUP
const router = express.Router()

//ROUTES
//create
//:
router.post('/', async (req, res) => {
    try {
        const workout = await modelWorkouts.add(req.body)
        workout
        ?   res.status(201).json(workout)
        :   res.status(404).json({error: `Workout couldn't be added.`})
    } catch (err) {
        console.log('workout add:'. err)
        res.status(500).json(err)
    }
})

//read
//: get all workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await modelWorkouts.get_all()
        if(workouts.length > 0) {
            workouts.map(workout => misc.remove_keys(workout, 'id'))
            res.status(200).json(workouts)
        } else
            res.status(404).json({error: `No workouts found.`})
    } catch (err) {
        console.log(`get all workouts:`, err)
        res.status(500).json(err)
    }
})
//: get workout by name
router.get('/name/:name', async (req, res) => {
    try {
        const workout = await modelWorkouts.get_by({name: req.params.name})
        if(workout) {
            workout.remove_keys(workout, 'id')
            res.status(200).json(workout)
        } else
            res.status(404).json({error: `Couldn't find workout: ${req.params.name}`})
    } catch (err) {
        console.log(`get workout by workout name:`, err)
        res.status(500).json(err)
    }
})
//: get workout by wid
router.get('/wid/:wid', async (req, res) => {
    try {
        const workout = await modelWorkouts.get_by({wid: req.params.wid})
        if(workout) {
            workout.remove_keys(workout, 'id')
            res.status(200).json(workout)
        } else
            res.status(404).json({error: `Couldn't find workout: ${req.params.wid}`})
    } catch (err) {
        console.log(`get workout by wid:`, err)
        res.status(500).json(err)
    }
})
//: get workouts by username

//update
//: update workout by workout name
//: update workout by wid
router.put('/wid/:wid', async (req, res) => {
    try {
        const workout = await modelWorkouts.update_by_wid(req.params.wid, req.body)
        if(workout) {
            workout.remove_keys(workout, 'id')
            res.status(200).json(workout)
        } else
            res.status(404).json({error: `Couldn't find workout: ${req.params.wid}`})
    } catch (err) {
        console.log('update workout by wid:', err)
        res.status(500).json(err)
    }
})

//delete
router.delete('/wid/:wid', async (req, res) => {
    try {
        const workout = await modelWorkouts.remove_by_wid(req.params.wid)
        workout
        ? res.status(200).json({message: `${workout.name} has been terminated.`})
        : res.status(404).json({message: `Couldn't find workout ${req.params.wid}.`, required_fields: 'wid'})
    } catch (err) {
        console.log('delete workout:', err)
        res.status(500).json(err)
    }
})

//EXPORTS
module.exports = router