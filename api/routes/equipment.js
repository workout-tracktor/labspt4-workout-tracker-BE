//ENDPOINT: /api

//IMPORTS
const express = require('express')
// const remove = require('../helpers/remove')

//MIDDLEWARE
const {data, required, unique, id, prepare, encrypt} = require('../middleware')

//MODELS
const modelEquipments = require('../models/equipments')

//SETUP
const router = express.Router()

//ROUTES
//create
//:add a new equipment
router.post('/equipment', data, required, unique, prepare, async (req, res) => {
    try {
        const equipment = await modelEquipments.add(req.data.prepared)
        // console.log('equipment', equipment)
        equipment
        ?   res.status(201).json(equipment)
        :   res.status(404).json({error: `Equipment couldn't be added.`})
    } catch (err) {
        res.status(500).json(err)
    }
})

//:get a single equipment fitting a set of requirements
router.get('/equipment', data, async (req, res) => {
    try {
        const equipment = await modelEquipments.get_by(req.data.query)
        if(equipment) res.status(200).json(equipment)
        else res.status(404).json({error: `The database does not have equipment.`})
    } catch(err) {
        res.status(500).json(err)
    }
})

//:get all users fitting a set of requirements
router.get('/equipments', data, async (req, res) => {
    try {
        const equipments = await modelEquipments.get_all_by(req.data.query)
        if(equipments.length > 0) res.status(200).json(equipments)
        else res.status(404).json({error: `No equipments found.`}) //include query
    } catch(err) {
        res.status(500).json(err)
    }
})

//update
//:
router.put('/equipment', data, id, async (req, res) => {
    // console.log(req.data)
    try {
        const equipment = await modelEquipments.update_by_id(req.data.id, req.data.body)
        // console.log('equipment', equipment)
        if(equipment) res.status(201).json(equipment)
        else res.status(404).json({error: `Couldn't update equipment.`})
    } catch(err) {
        res.status(500).json(err)
    }
})

//delete
//:
router.delete('/equipment', data, id, async (req, res) => {
    try {
        const equipment = await modelEquipments.remove_by_id(req.data.id, req.data.body)
        if(equipment) res.status(201).json({success: `equipment has been terminated.`})
        else res.status(404).json({error: `Couldn't update equipment.`})
    } catch(err) {
        res.status(500).json(err)
    }
})

//EXPORTS
module.exports = router