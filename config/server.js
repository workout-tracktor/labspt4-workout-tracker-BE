const express = require("express")
const server = express()
const db = require('../data/dbConfig')

server.get("/", (req, res) => {
    db('users')
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

module.exports = server