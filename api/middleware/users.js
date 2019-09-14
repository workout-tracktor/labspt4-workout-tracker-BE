//IMPORTS
// const crypt = require('bcryptjs')
// const uuid = require('uuid')
//local
const get = require('../helpers/get')

//SETTINGS
const unqiue = {
    users: ['username', 'email'],
}

//: Removes all unnecessary data in req
//: Removes any possible extra queries or fields in req.body
//: Replaces any ! values with null in query
//: Finds associated table
//: Finds required fields
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
        unique: unqiue[table],
        query: query,
        body: body,
    }

    next()
}

required = (req, res, next) => {
    const fields_missing = req.data.required.filter(item => !req.data.body.hasOwnProperty(item))
    console.log(fields_missing)
    if(fields_missing.length > 0)
        res.status(612).json({
            error: `Not all required fields are provided.`,
            required: req.data.required,
            missing: fields_missing})
    next()
}

//EXPORTS
module.exports = {
    data,
    required,
}