//__   __  ___   ______   ______   ___      _______  _     _  _______  ______    _______ 
//|  |_|  ||   | |      | |      | |   |    |       || | _ | ||   _   ||    _ |  |       |
//|       ||   | |  _    ||  _    ||   |    |    ___|| || || ||  |_|  ||   | ||  |    ___|
//|       ||   | | | |   || | |   ||   |    |   |___ |       ||       ||   |_||_ |   |___ 
//|       ||   | | |_|   || |_|   ||   |___ |    ___||       ||       ||    __  ||    ___|
//| ||_|| ||   | |       ||       ||       ||   |___ |   _   ||   _   ||   |  | ||   |___ 
//|_|   |_||___| |______| |______| |_______||_______||__| |__||__| |__||___|  |_||_______| 

//IMPORTS
const crypt = require('bcryptjs')
const uuid = require('uuid')
//local
const get = require('../helpers/get')
const check = require('../helpers/check')
const {merge} = require('../helpers/replace')
const {send_error} = require('../helpers/errors')

//SETTINGS
const unqiue_fields = {
    workouts: ['name'],
    exercises: ['name'],
    equipments: ['name'],
    units: ['name'],
    users: ['username', 'email'],
}

//:
prepare = async (req, res, next) => {
    const prepared = merge(req.data.schema, req.data.body)
    if(!req.data.user_id) prepared[req.data.table.slice(0, -1) + '_id'] = uuid.v4()
    req.data.prepared = prepared
    next()
}

//:
encrypt = (req, res, next) => {
    if(!req.data.body.hasOwnProperty('password'))
        return send_error(res, 61203, req.data.table, 'password', 'password')
    
    req.data.body.password = crypt.hashSync(req.data.body.password, 1)

    next()
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
    const schema = get.schema(columns)
    const required = await get.required(table)
    const body = get.body(columns, req.body)
    const {settings, query} = get.params(columns, req.query)
    const method = req.method
    
    req.data = {
        table: table,
        method: method,
        array: array,
        schema: schema,
        required: required,
        settings: settings,
        unique: unqiue_fields[table],
        query: query,
        body: body,
    }

    next()
}

schema = async (req, res, next) => {
    //check if all required fields are provided
    const fields_missing = req.data.required.filter(item => !req.data.body.hasOwnProperty(item))
    if(fields_missing.length > 0) return send_error(res, 23502, req.data.table, fields_missing, req.data.required)

    //checks each provided unique field to see if they're unique
    const unremarkable_fields = (await check.unique(req.data.table, req.data.body, req.data.unique)).map(field => Object.keys(field)[0])
    if(unremarkable_fields.length > 0) return send_error(res, 23505, req.data.table, unremarkable_fields, req.data.unique)

    next()
}

//:get id via ?_id from query, or body
id = async (req, res, next) => {
    //check if row id was provided
    const field = req.data.table.slice(0, -1) + '_id'
    const field_id = req.data.query[field] ? req.data.query[field] : req.data.body[field]
    if(!field_id) return send_error(res, 61201, req.data.table, field, field)
    
    //check if row with that id exists
    const id = await get.id(req.data.table, field, field_id)
    if(!id) return send_error(res, 61202, req.data.table, field, field)

    req.data.id = id
    next()
}

//EXPORTS
module.exports = {
    data,
    schema,
    id,
    prepare,
    encrypt,
}