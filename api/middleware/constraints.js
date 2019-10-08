/*


What it do?
Checks to see if post requests have both required and unique fields.
Checks put and delete for id field
*/
//imports
const get = require('../helpers/get')
const check = require('../helpers/check')
const {unqiue_fields} = require('../../config/unique_fields')
const {send_error} = require('../helpers/errors')

const requirements = async (table, body) => {
    const not_required = ['created', 'updated']
    const required_fields = (await get.required(table)).filter(field => not_required.indexOf(field) === -1)
    const missing_fields = required_fields.filter(field => !body.hasOwnProperty(field))
    return {required_fields: required_fields, missing_fields: missing_fields}
}

const unique = async (table, body) => {
    const unique_fields = unqiue_fields[table]
    const unremarkable_fields = (await check.unique(table, body, unique_fields))
    return {unique_fields: unique_fields, unremarkable_fields: unremarkable_fields}
}

const id = async (table, body, query) => {
    const field_name = table.slice(0,-1) + '_id'
    if(query[field_name]) {
        const that = await get.id(table, field_name, query[field_name])
        console.log('t', that)
    }
    // const field_id = query[field_name] ? query[field_name] : body[field_name]
    // console.log(field_name)
    // console.log('f', field_id)
}

const constraints = async (req, res, next) => {
    switch(req.method) {
        case 'POST': {
            //check if all required fields are present
            const {required_fields, missing_fields} = await requirements(req.data.table, req.body)
            if(missing_fields.length) return send_error(res, '23502', req.data.table, missing_fields, required_fields)

            //check if all unique fields are in fact unique
            const {unique_fields, unremarkable_fields} = await unique(req.data.table, req.body)
            if(unremarkable_fields.length) return send_error(res, '23505', req.data.table, unique_fields, unremarkable_fields)
            break
        }
        case 'GET': next(); break
        case 'PUT':
        case 'DELETE': {
            id(req.data.table, req.body, req.query)
            break
        }
    }
    next()
}

module.exports = {
    constraints
}