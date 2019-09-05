//IMPORTS
const uuid = require('uuid')
//local
const modelLogs = require('../models/logs')
const retrieve = require('../helpers/retreive')
const check = require('../helpers/check')

//VARIABLES
const db_name = 'logs'

//prepares the reqbody for insertion into the db
//removes all unnessary fields for protection
prepare = async (req, res, next) => {
    //calculates id of new workout
    const id = await retrieve.new_id(db_name)

    //get timestamp
    const now = new Date()

    //rebuild reqbody, removing any possilbe extra fields
    req.body = {
        id: id,
        wid: req.body.wid,
        lid: uuid.v4(),
        uid: req.body.uid,
        created: now,
        distance: req.body.distance,
        distance_units: req.body.distance_units,
        reps: req.body.reps,
        weight: req.body.weight,
        weight_units: req.body.weight_units,
        duration_ms: req.body.duration,
        completed: req.body.completed
    }
    
    next()
}

unique = async (req, res, next) => {
    const unique_fields = []
    let message = ''
    let flag = false
    let fields = []
    await Promise.all(unique_fields.map(async field => {
        if(await retrieve.get_by(db_name, {[field]: req.body[field]})) {
            message = `The ${field} '${req.body[field]}' is currently in use.`
            fields.push(field)
            flag = true
        }
    }))
    if(flag) return res.status(612).json({error: message, invalid_fields: fields})

    next()
}

required = async (req, res, next) => {
    const required_fields = await retrieve.required_list(db_name)
    required_fields.remove('id', 'lid', 'created')
    if(!check.required(req.body, ...required_fields))
        return res.status(500).json({error: `The required fields are: ${required_fields}.`})

    next()
}

module.exports = {
    prepare,
    unique,
    required,
}