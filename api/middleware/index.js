//__   __  ___   ______   ______   ___      _______  _     _  _______  ______    _______ 
//|  |_|  ||   | |      | |      | |   |    |       || | _ | ||   _   ||    _ |  |       |
//|       ||   | |  _    ||  _    ||   |    |    ___|| || || ||  |_|  ||   | ||  |    ___|
//|       ||   | | | |   || | |   ||   |    |   |___ |       ||       ||   |_||_ |   |___ 
//|       ||   | | |_|   || |_|   ||   |___ |    ___||       ||       ||    __  ||    ___|
//| ||_|| ||   | |       ||       ||       ||   |___ |   _   ||   _   ||   |  | ||   |___ 
//|_|   |_||___| |______| |______| |_______||_______||__| |__||__| |__||___|  |_||_______| 

//IMPORTS
// const crypt = require('bcryptjs')
// const uuid = require('uuid')
//local
const get = require('../helpers/get')
const check = require('../helpers/check')

//SETTINGS
const unqiue_fields = {
    users: ['username', 'email'],
}

//: Removes all unnecessary data in req
//: Removes any possible extra queries or fields in req.body
//: Replaces any ! values with null in query
//: Finds associated table
//: Finds required fields
//: Adds in unique field array
//: Creates a query and settings object object for easier db calls
//: Checks if the the request is for a single object or array of objects
data = async (req, res, next) => {
    const {array, table} = get.path(req.route.path)
    const columns = await get.columns(table)
    const required = await get.required(table)
    const body = get.body(columns, req.body)
    const {settings, query} = get.params(columns, req.query)

    req.data = {
        table: table,
        array: array,
        required: required,
        settings: settings,
        unique: unqiue_fields[table],
        query: query,
        body: body,
    }

    next()
}

//:checks to see if all required fields are provided
required = (req, res, next) => {
    const fields_missing = req.data.required.filter(item => !req.data.body.hasOwnProperty(item))
    if(fields_missing.length > 0)
        res.status(612).json({
            error: `Not all required fields are provided.`,
            required: req.data.required,
            missing: fields_missing})
    else next()
}

//:checks each provided unique field to see if they're unique
unique = async (req, res, next) => {
    const in_use = await check.unique(req.data.table, req.data.body, req.data.unique)
    if(in_use.length > 0) {
        const unremarkable_fields = in_use.map(field => Object.keys(field)[0])
        res.status(612).json({
            error: `Unremarkable fields.`,
            unique: req.data.unique,
            unremarkable_fields: unremarkable_fields,
            details: in_use,
        })
    } else next()
}

//:get id via ?_id from query, or body
id = async (req, res, next) => {
    const field = req.data.table.slice(0, -1) + '_id'
    const field_id = req.data.query[field] ? req.data.query[field] : req.data.body[field]
    let id = false
    if(field_id) {
        id = await get.id(req.data.table, field, field_id)
    } else {
        res.status(612).json({error: `${field} not provided.`})
    }
    if(id) {
        req.data.id = id
        next()
    } else {
        res.status(612).json({error: `${field} not found.`}) 
    }
}

//EXPORTS
module.exports = {
    data,
    required,
    unique,
    id,
}