const uuid = require('uuid')
const crypt = require('bcryptjs')
const get = require('./helpers/get')
const check = require('./helpers/check')
const {add_one, get_one, get_all, update_one, remove_one, remove_all} = require('../config/models')
const {send_error} = require('./helpers/errors')

//check every 
const check_post = async (res, table, body) => {
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
    
    return body
}

const multi_post = async (res, table, body, error = '') => {
    let stack = []
    const tbls = await tables() //move this outside of the loop, only need it once
    const schema = await get.schema(table)
    const types = schema.types
    // const columns = get.schema_types(schema)
    // console.log('columns', schema)
    for(let idx in tbls) {
        const tbl = tbls[idx]
        //field has the same name as a table
        if(body.hasOwnProperty(tbl)) {
            console.log('tbl', tbl)
            //check the value type of field in body
            //:array and object need to be checked and posted in the db
            //:string and integer need to be checked if they exist in the db
            let type = Array.isArray(body[tbl]) ? 'array' : typeof body[tbl]
            if(type === 'number') type = Number.isInteger(body[tbl]) ? 'integer' : 'number'
            // console.log('type', type)
            switch(type) {
                //: no id should be type number
                case 'number': return (error = 'C0001')
                //both string and number indicate an id is given
                //no need to post; just check if the id is valid
                case 'string':
                case 'integer': try {
                        const field_name = type === 'string' ? tbl.slice(0,-1)+'_id' : 'id'
                        const id = (await get_one(tbl, {[field_name]: body[tbl]})).id
                        if(!id) console.log(`${field_name} is invalid`)
                        else body[tbl] = [id]
                        break
                    } catch(err) {return (error = 'C0001')}
                //objects should have all required and unique fields
                case 'object': try {
                        //check to make sure the current post is valid
                        let post = await check_post(res, tbl, body[tbl])
                        //if it's not throw an error
                        if(post.error) return post
                        //don't add the full object to the current stack item
                        //if it's an array if ids, add an empty array
                        //if it's an int or string, add an empty string
                        //these will be filled in make_req with object id(s)
                        const type = schema.types[tbl]
                        if(type) type === 'ARRAY' ? body[tbl] = [] : body[tbl] = ''
                        //check current stack item for more tables and add them to current stack
                        stack.push(...await multi_post(res, tbl, post))
                        break
                    } catch(err) {
                        console.log('err', err)
                        return {error: true, table: tbl, code: 'C0002'}
                    }
                case 'array': try {
                        console.log('an array was sent')
                    } catch(err) {
                        return {error: true, table: tbl, code: 'C0003'}
                    }
            }
        }
    }
    const columns = schema.columns

    body = get.body(columns, body)
    //add created and updated times
    body.created = body.updated = (new Date()).getTime()
    //add current item to the stack and push it up
    stack.push({table: table, body: body})
    // console.log('table', table, 'stack', stack)

    // console.log(`stack:`, stack, `\n`)
    return stack
}

module.exports = async (req, res, next) => {
    switch(req.method) {
        case 'POST': {
            const {table} = get.path(req.originalUrl)
            req.stack = await multi_post(res, table, req.body)
            // console.log('post stack', req.stack)
            // return res.status(200).json(stack)
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