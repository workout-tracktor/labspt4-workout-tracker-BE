//ENDPOINT: /api/users

//IMPORTS
const express = require('express')
const misc = require('../helpers/misc')
//middleware
const mwUsers = require('../middleware/users')
//models
const modelUsers = require('../models/users')

//SETUP
const router = express.Router()

//ROUTES
//create
//:
router.post('/register', mwUsers.register, async (req, res) => {
    try {
        const user = await modelUsers.add(req.body)
        user
        ?   res.status(201).json(user)
        :   res.status(404).json({error: `User couldn't be added.`})
    } catch (err) {
        // console.log('user register:', err)
        res.status(500).json(err)
    }
})
//:
router.post('/login', mwUsers.authenticate, mwUsers.username_exists, mwUsers.password_matches, async (req, res) => {
    try {
        const user = await modelUsers.get_by({username: req.body.username})
        user
        ?   res.status(201).json({message: `login successful`, token: req.authorization, username: req.body.username})
        :   res.status(404).json({error: `Wong!`})
    } catch (err) {
        console.log('user register err:',err)
        res.status(500).json(err)
    }
})

//read
//:
router.get('/', async (req, res) => {
    try {
        const users = await modelUsers.get_all()
        if(users.length > 0) {
            //keep id hidden from frontend
            users.map(user => misc.remove_keys(user, 'id'))
            res.status(200).json(users)
        } else
            res.status(404).json({error: `No users found.`})
    } catch (err) {
        console.log('get all users:', err)
        res.status(500).json(err)
    }
})
//:
router.get('/:uid', async (req, res) => {
    try {
        const user = await modelUsers.get_by({uid: req.params.uid})
        if(user) {
            //keep id hidden from frontend
            misc.remove_keys(user, 'id')
            res.status(200).json(user)
        } else
            res.status(404).json({error: `Couldn't find user: ${req.params.username}.`})
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
        const user = await modelUsers.remove_by_uid(req.params.uid)
        user
        ? res.status(200).json({message: `${user.username} has been terminated.`})
        : res.status(404).json({message: `Couldn't find user ${req.params.uid}.`, required_fields: 'uid'})
    } catch (err) {
        console.log('delete user:', err)
        res.status(500).json(err)
    }
})

//EXPORTS
module.exports = router