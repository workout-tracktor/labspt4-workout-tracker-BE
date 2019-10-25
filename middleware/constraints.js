/*


What it do?
Checks to see if post requests have both required and unique fields.
Checks put and delete for id field
*/
//imports
const get = require('./helpers/get')
const check = require('./helpers/check')
const {send_error} = require('./helpers/errors')

const requirements = async (table, body) => {
    const not_required = ['created_at', 'updated_at']
    const required_fields = (await get.required(table)).filter(field => not_required.indexOf(field) === -1)
    const missing_fields = required_fields.filter(field => !body.hasOwnProperty(field))
    return {required_fields: required_fields, missing_fields: missing_fields}
}

const unique = async (table, body) => {
    const unique_fields = await get.unique(table)
    const unremarkable_fields = (await check.unique(table, body, unique_fields))
    return {unique_fields: unique_fields, unremarkable_fields: unremarkable_fields}
}

module.exports =  async (req, res, next) => {
    switch(req.method) {
        case 'POST': {
            const {table} = get.path(req.originalUrl)
            
            //check if all required fields are present
            const {required_fields, missing_fields} = await requirements(table, req.body)
            if(missing_fields.length) return send_error(res, '23502', table, missing_fields, required_fields)
            
            //check if all unique fields are in fact unique
            const {unique_fields, unremarkable_fields} = await unique(table, req.body)
            if(unremarkable_fields.length) return send_error(res, '23505', table, unique_fields, unremarkable_fields)
            
            next()
            break
        }
        case 'PUT': {
            const {array, table} = get.path(req.originalUrl)
            if(!array) {
                req.id = await get.id(table, req.body, req.query)
                req.id ? next() : send_error(res, 'P0001', table)
            }
            else next()
            break
        }
        case 'DELETE': {
            const {array, table} = get.path(req.originalUrl)
            if(!array) {
                req.id = await get.id(table, req.body, req.query)
                req.id ? next() : send_error(res, 'D0001', table)
            }
            else next()
            break
        }
        default: next()
    }
}