//IMPORTS
// const crypt = require('bcryptjs')
// const uuid = require('uuid')
//local
const get = require('../helpers/get')

//: Removes all unnecessary data in req
//: Removes any possible extra queries or fields in req.body
//: Finds associated table
//: Finds required fields
//: Creates a query and settings object object for easier db calls
//: Checks if the the request is for a single object or array of objects
cleanreq = async (req, res, next) => {
    const {array, table} = get.path(req)
    const columns = await get.columns(table)
    const required = await get.required(table)
    const body = get.body(columns, req.body)
    const {settings, query} = get.params(columns, req.query)

    req = {
        table: table,
        array: array,
        required: required,
        settings: settings,
        query: query,
        body: body,
    }

    next()
}

//EXPORTS
module.exports = {
    cleanreq,
}