const uuid = require('uuid')
const crypt = require('bcryptjs')
const get = require('./helpers/get')
const check = require('./helpers/check')
const {add_one, get_one, get_all, update_one, remove_one, remove_all} = require('../config/models')
const {send_error} = require('./helpers/errors')

//check and return value type
const get_type = value => {
    let type = Array.isArray(value) ? 'array' : typeof value
    if(type === 'number') type = Number.isInteger(value) ? 'integer' : 'number'
    return type
}

//check if object if legit and prepares it for the stack
const check_object = async (table, body) => {
    //check if all required fields are present
    const {required_fields, missing_fields} = await check.required(table, body)
    if(missing_fields.length > 0)
        return {error: true, table: table, code: 'P1111', required_fields: required_fields, missing_fields: missing_fields}

    //check if all unqiue fields are unique
    const {unique_fields, unremarkable_fields} = await check.unique(table, body)
    if(unremarkable_fields.length)
        return {error: true, table: table, code: 'P2222', unique_fields: unique_fields, unremarkable_fields: unremarkable_fields}

    //check for password fields and encrypt them
    if(body.hasOwnProperty('password'))
        body.password = crypt.hashSync(body.password, 1)

    //make sure the user_id is unique
    if(table === 'users') body.user_id = uuid.v4()

    //return full object with filled values
    const schema = await get.schema(table)

    return schema.fill(body)
}

const check_id = async (table, id) => {
    const field_name = typeof id === 'string' ? table.slice(0,-1)+'_id' : 'id'
    const res = (await get_one(table, {[field_name]: id}))
    return Boolean(res)
}

const router = async (table, body, expected_type) => {
    let thereturned = {}
    switch(get_type(body)) {
        case 'number': return (error = 'C0001')
        case 'string':
        case 'integer':
            if(await check_id(table, body)) {
                if(expected_type === 'ARRAY') thereturned.body = [body]
                thereturned.body = body
            }
            break
        case 'object':
            const stack_item = await check_object(table, body)
            if(stack_item.error) thereturned.error = stack_item.error
            if(thereturned.stack) thereturned.stack.push({table: table, body: body})
            else thereturned.stack = [{table: table, body: stack_item}]
            break
        case 'array':
            for(let i=body.length-1; i>=0; i--) {
                const stack_item = await router(table, body[i])
                if(stack_item.body)
                    if(thereturned.body) thereturned.body.push(stack_item.body)
                    else thereturned.body = [stack_item.body]
                if(stack_item.stack)
                    if(thereturned.stack) thereturned.stack.push(...stack_item.stack)
                    else thereturned.stack = [...stack_item.stack]
            }
    }
    return thereturned
}

const postception = async (table, body, tables) => {
    let stack = []
    const schema = await get.schema(table)
    for(let idx in tables) {
        const tbl = tables[idx]
        //field has the same name as a table
        if(body.hasOwnProperty(tbl)) {
            const stack_item = await router(tbl, body[tbl], schema.types[tbl])
            if(stack_item.error) return stack_item
            if(stack_item.stack) stack.push(...stack_item.stack)
            if(stack_item.body) body[tbl] = stack_item.body
            else body[tbl] = schema.types[tbl] === 'ARRAY' ? [] : null
        }
    }
    //body should include all fields, not just the ones with data
    body = schema.fill(body)
    //add current item to the stack
    stack.push({table: table, body: body})
    return stack
}

module.exports = async (req, res, next) => {
    console.clear()
    switch(req.method) {
        case 'POST': {
            const {table} = get.path(req.originalUrl)
            req.stack = await postception(table, req.body, await tables())
            if(req.stack.error) return send_error(res, req.stack.code, req.stack.table)
            // return res.status(200).json(req.stack)
            console.log('made it here pr')
            console.log('err', req.stack.error)
            console.log('made it here pr2')
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
            req.body.updated = time
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