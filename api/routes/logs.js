//ENDPOINT: /api/logs

//IMPORTS
const express = require('express')
const misc = require('../helpers')

//MIDDLEWARE
// const mwLogs = require('../middleware/logs')

//MODELS
const modelLogs = require('../models/logs')

//SETUP
const router = express.Router()

//ROUTES
//create
//: add a new log
router.post('/', async (req, res) => {
    try {
        const log = await modelLogs.add(req.body)
        log
        ?   res.status(201).json(log)
        :   res.status(404).json({error: `Workout couldn't be added.`})
    } catch (err) {
        console.log('log add:'. err)
        res.status(500).json(err)
    }
})

//read
//: get all logs
router.get('/', async (req, res) => {
    try {
        const logs = await modelLogs.get_all()
        if(logs.length > 0) {
            logs.map(log => misc.remove_keys(log, 'id'))
            res.status(200).json(logs)
        }
    } catch (err) {
        console.log('log get all:'. err)
        res.status(500).json(err)
    }
})
//: get all logs filtered by user id
router.get('/uid/:uid', async (req, res) => {
    try {
        const logs = await modelLogs.get_all_by({uid: req.params.uid})
        if(logs.length > 0) {
            logs.map(log => misc.remove_keys(log, 'id'))
            res.status(200).json(logs)
        } else
            res.status(404).json({error: `Couldn't find any logs for: ${req.params.uid}`})
    } catch (err) {
        console.log(`get logs for uid:`, err)
        res.status(500).json(err)
    }
})
//: get all logs filtered by user id and workout id
router.get('/uid/:uid/lid/:lid', async (req, res) => {
    try {
        const logs = await modelLogs.get_all_by({uid: req.params.uid, lid: req.params.lid})
        if(logs.length > 0) {
            logs.map(log => misc.remove_keys(log, 'id'))
            res.status(200).json(logs)
        } else
            res.status(404).json({error: `Couldn't find any log with lid ${req.params.lid} for user ${req.params.uid}.`})
    } catch (err) {
        console.log(`get lid logs for user uid:`, err)
        res.status(500).json(err)
    }
})
//: get log by lid
router.get('/lid/:lid', async (req, res) => {
    try {
        const log = await modelLogs.get_by({lid: req.params.lid})
        if(logs.length > 0) {
            misc.remove_keys(log, 'lid')
            res.status(200).json(log)
        } else
            res.status(404).json({error: `Couldn't find log: ${req.params.log}.`})
    } catch (err) {
        console.log('get log by lid', err)
        res.status(500).json(err)
    }
})

//update
//: update log by lid
router.put('/lid/:lid', async (req, res) => {
    try {
        const log = await modelLogs.update_by_lid(req.params.lid, req.body)
        if(log) {
            misc.remove_keys(log, 'id')
            res.status(200).json(log)
        } else
            res.status(404).json({error: `Couldn't find log: ${req.params.lid}.`})
    } catch (err) {
        console.log('update log by lid:', err)
        res.status(500).json(err)
    }
})

//delete
//: delete log by lid
router.delete('/lid:lid', async (req, res) => {
    try {
        const log = await modelLogs.remove_by_lid(req.params.lid)
        log
        ?   res.status(200).json({message: `${log.lid} has been terminated.`})
        :   res.status(404).json({error: `Couldn't find log ${req.params.lid}.`})
    } catch (err) {
        console.log('delete workout:', err)
        res.status(500).json(err)
    }
})

//EXPORTS
module.exports = router