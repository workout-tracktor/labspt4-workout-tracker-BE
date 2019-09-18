//ENDPOINT: /api

//IMPORTS
const express = require('express')
// const remove = require('../helpers/remove')

//MIDDLEWARE
const {data, required, unique, id, prepare, encrypt} = require('../middleware')

//MODELS
const modelUnits = require('../models/units')

//SETUP
const router = express.Router()

//ROUTES
//create
//:add a new unit
router.post('/unit', data, required, unique, prepare, async (req, res) => {
    try {
        const unit = await modelUnits.add(req.data.prepared)
        // console.log('unit', unit)
        unit
        ?   res.status(201).json(unit)
        :   res.status(404).json({error: `unit couldn't be added.`})
    } catch (err) {
        res.status(500).json(err)
    }
})

//:get a single unit fitting a set of requirements
router.get('/unit', data, async (req, res) => {
    try {
        const unit = await modelUnits.get_by(req.data.query)
        if(unit) res.status(200).json(unit)
        else res.status(404).json({error: `The database does not have unit.`})
    } catch(err) {
        res.status(500).json(err)
    }
})

//:get all users fitting a set of requirements
router.get('/unit', data, async (req, res) => {
    try {
        const units = await modelUnits.get_all_by(req.data.query)
        if(units.length > 0) res.status(200).json(units)
        else res.status(404).json({error: `No units found.`}) //include query
    } catch(err) {
        res.status(500).json(err)
    }
})

//update
//:
router.put('/unit', data, id, async (req, res) => {
    // console.log(req.data)
    try {
        const unit = await modelUnits.update_by_id(req.data.id, req.data.body)
        // console.log('unit', unit)
        if(unit) res.status(201).json(unit)
        else res.status(404).json({error: `Couldn't update unit.`})
    } catch(err) {
        res.status(500).json(err)
    }
})

//delete
//:
router.delete('/unit', data, id, async (req, res) => {
    try {
        const unit = await modelUnits.remove_by_id(req.data.id, req.data.body)
        if(unit) res.status(201).json({success: `unit has been terminated.`})
        else res.status(404).json({error: `Couldn't update unit.`})
    } catch(err) {
        res.status(500).json(err)
    }
})

//EXPORTS
module.exports = router