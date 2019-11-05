const uuid = require('uuid')
const crypt = require('bcryptjs')
const get = require('./helpers/get')
const check = require('./helpers/check')
const {add_one, get_one, get_all, update_one, remove_one, remove_all} = require('../config/models')
const {send_error} = require('./helpers/errors')

const get_date = () => {
    const time = new Date()
    const year = time.getFullYear()
    const month = time.getMonth()+1 < 10 ? `0${time.getMonth()+1}` : time.getMonth()+1
    const day = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate()
    return `${year}-${month}-${day}`
}

//check and return value type
const get_type = value => {
    let type = Array.isArray(value) ? 'array' : typeof value
    if(type === 'number') type = Number.isInteger(value) ? 'integer' : 'number'
    return type
}

//check id
const check_id = async (table, id) => {
    const field_name = typeof id === 'string' ? table.slice(0,-1)+'_id' : 'id'
    const res = (await get_one(table, {[field_name]: id}))
    return Boolean(res)
}

//check if object if legit and prepares it for the stack
const check_object = async (parent_table, table, body) => {
    const schema = await get.schema(table)
    const parent_id_field = `${parent_table.slice(0,-1)}_id`

    //check if all table_id fields are actual ids
    const table_ids = schema.id_fields.filter(field => body.hasOwnProperty(field))
    for(id in table_ids) {
        const field = table_ids[id]
        const field_table = table_ids[id].slice(0,-3) + 's'
        const exists = await check_id(field_table, body[field])
        if(!exists) delete body[field]
    }

    //check if all required fields are present
    //parent_id_field; if not valid, is filled in during make_req
    const missing_fields = schema.required
        .filter(field => field !== parent_id_field)
        .filter(field => !body.hasOwnProperty(field))
    if(missing_fields.length > 0)
        return {error: true, table: table, code: 'P1111', required_fields: schema.required, missing_fields: missing_fields}

    //check if all unqiue fields are unique
    const {unique_fields, unremarkable_fields} = await check.unique(table, body)
    if(unremarkable_fields.length)
        return {error: true, table: table, code: 'P2222', unique_fields: unique_fields, unremarkable_fields: unremarkable_fields}

    //check for password fields and encrypt them
    if(body.hasOwnProperty('password'))
        body.password = crypt.hashSync(body.password, 1)

    if(!body.date) body.date = get_date()

    return schema.fill(body)
}

const postception = async (parent_table, table, body) => {
    const schema = await get.schema(table)
    const stack = []
    for(field in body) {
        //check any objects as a possible new post request
        //check any arrays for objects and loop through them
        if(schema.tables.includes(field)) {
            switch(get_type(body[field])) {
                case 'object':
                    body = await check_object(parent_table, field, body[field])
                    break
                case 'array':
                    const arr = body[field].filter(el => get_type(el) === 'object')
                    for(el in arr) {
                        if(!body[field][el].date && body.date) body[field][el].date = body.date
                        if(!body[field][el].workout_type && body.workout_type) body[field][el].workout_type = body.workout_type
                        if(!body[field][el].user_id && body.user_id)
                        const that = await postception(parent_table, field, {[field]: body[field][el]})
                        if(that) stack.push(...that)
                    }
                    break
                default:
                    //
                    delete body[field]
            }
        }
        //remove any fields that aren't in the table schema
        if(!schema.fields.includes(field)) delete body[field]
        //check the id of any incoming fields
        if(schema.id_fields.includes(field)) {
            const field_table = field.slice(0,-3) + 's'
            const that = await check_id(field_table, body[field])
            if(!that) delete body[field]
        }
    }

    if(!body.date) body.date = get_date()
    if(!body.error) stack.push({table: table, body: schema.fill(body)})
    return stack
}

module.exports = async (req, res, next) => {
    switch(req.method) {
        case 'POST': {
            const {table} = get.path(req.originalUrl)
            req.stack = await postception(table, table, req.body, await tables())
            // console.log('rest', req.stack)
            // return res.status(200).json(req.stack)
            if(req.stack.error) return send_error(res, req.stack.code, req.stack.table)
            next()
            break
        }
        case 'GET': {
            const {array, table} = get.path(req.originalUrl)
            const schema = await get.schema(table)
            const columns = schema.columns
            const {query} = get.params(columns, req.query)
            req.table = table
            req.array = array
            req.query = query
            req.status = 200
            next()
            break
        }
        case 'PUT': {
            const {table} = get.path(req.originalUrl)
            const schema = await get.schema(table)
            const columns = schema.columns
            const time = (new Date()).getTime()
            req.table = table
            req.body = get.body(columns, req.body)
            req.status = 200
            next()
            break
        }
        case 'DELETE': {
            const {array, table} = get.path(req.originalUrl)
            req.table = table
            req.array = array
            req.status = 200
            next()
            break
        }
    }
}