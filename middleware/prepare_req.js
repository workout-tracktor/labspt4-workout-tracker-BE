const uuid = require('uuid')
const crypt = require('bcryptjs')
const get = require('./helpers/get')
const check = require('./helpers/check')
const {add_one, get_one, get_all, update_one, remove_one, remove_all} = require('../config/models')
const {send_error} = require('./helpers/errors')

//check every 
const check_post = async (res, table, body) => {
    console.log('yerp')
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
    
    //add created and updated times
    body.created = body.updated = (new Date()).getTime()
    // console.log({table: table, body: body})
    return body
}

const multi_post = async (res, table, body, error = '') => {
    let stack = []
    const tbls = await tables() //move this outside of the loop, only need it once
    for(let idx in tbls) {
        const tbl = tbls[idx]
        //field has the same name as a table
        if(body.hasOwnProperty(tbl)) {
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
                        // console.log('object table', tbl)
                        // console.log('tbl', tbl, 'bdy', body[tbl])
                        let post = await check_post(res, tbl, body[tbl])
                        if(post.error) return post
                        stack = await multi_post(res, tbl, post)
                        console.log('new stack item', stack)
                        /////////////////
                        // stack.push({table: tbl, body: post})
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
    //filter out any extra fields from the current item
    const columns = await get.columns(table)
    body = get.body(columns, body)
    //add current item to the stack and push it up
    stack.push({table: table, body: body})
    return stack
}

module.exports = async (req, res, next) => {
    switch(req.method) {
        case 'POST': {
            const {table} = get.path(req.originalUrl)
            const stack = await multi_post(res, table, req.body)
            console.log('back in main')
            // console.log('post stack', stack)
            return res.status(200).json(stack)
            if(stack.error) return send_error(res, stack.code, stack.table)
            // console.log('made it here')

            
            const columns = await get.columns(table)
            const time = (new Date()).getTime()
            req.table = table
            req.body = get.body(columns, req.body)
            if(req.table === 'users') req.body.user_id = uuid.v4()
            req.body.created = time
            req.body.updated = time
            req.status = 201
            next()
            break
        }
        case 'GET': {
            const {array, table} = get.path(req.originalUrl)
            const columns = await get.columns(table)
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
            const columns = await get.columns(table)
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