//ENDPOINT: /api/users

//IMPORTS
const express = require('express')
//middleware
//models
const modelUsers = require('../models/users')

//SETUP
const router = express.Router()

//ROUTES
//create
//:
router.post('/register', async (req, res) => {
    try {
        const user = await modelUsers.add(req.body)
        user
        ?   res.status(201).json(user)
        :   res.status(404).json({message: `User couldn't be added.`})
    } catch (err) {
        console.log('user register:', err)
        res.status(500).json(err)
    }
})

//read
//:
router.get('/', async (req, res) => {
    try {
        const users = await modelUsers.get_all()
        users.length > 0
        ?   res.status(200).json(users)
        :   res.status(404).json({message: `No users found.`})
    } catch (err) {
        console.log('get all users:', err)
        res.status(500).json(err)
    }
})
//:
router.get('/:username', async (req, res) => {
    try {
        const user = await modelUsers.get_by({username: req.params.username})
        user
        ?   res.status(200).json(user)
        :   res.status(404).json({message: `Couldn't find user: ${req.params.username}.`})
    } catch (err) {
        console.log('get user by username:', err)
        res.status(500).json(err)
    }
})
//:
router.get('/:uid', async (req, res) => {
    try {
        const user = await modelUsers.get_by({uid: req.params.uid})
        user
        ?   res.status(200).json(user)
        :   res.status(404).json({message: `Couldn't find user: ${req.params.username}.`})
    } catch (err) {
        console.log('get user by uid:', err)
        res.status(500).json(err)
    }
})
// /:username/logs/:limit
// /:username/logs/workout/:workout/:limit
// /:username/workouts/:limit

//update
//:
router.put('/:uid', async (req, res) => {
    try {
        const user = await modelUsers.update_by_uid(req.params.uid, req.body)
        user
        ?   res.status(200).json(user)
        :   res.status(404).json({message: `Couldn't update user ${req.params.uid}.`})
    } catch (err) {
        console.log('update user:', err)
        res.status(500).json(err)
    }
})

//delete
router.delete('/:uid', async (req, res) => {
    try {
        await modelUsers.remove_by_id(req.params.uid)
        res.status(200).json({message: `User has been terminated.`})
    } catch (err) {
        console.log('delete user:', err)
        res.status(500).json(err)
    }
})

//EXPORTS
module.exports = router