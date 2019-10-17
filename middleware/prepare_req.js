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

        return body
}

const multi_post = async (res, table, body) => {
    let post_stack = []
    // console.log('body0', body)
    const tbls = await tables()
    let error = ''
    for(let tbl_name in body) {
        //field has the same name as a table
        if(tbls.includes(tbl_name)) {
            //check the value type of table
            //:array and object need to be checked and posted in the db
            //:string and integer need to be checked if they exist in the db
            let type = Array.isArray(body[tbl_name]) ? 'array' : typeof body[tbl_name]
            if(type === 'number') type = Number.isInteger(body[tbl_name]) ? 'integer' : 'number'
            // console.log('type', type)
            switch(type) {
                //: no id should be type number
                case 'number': return (error = 'C0001')
                //both string and number indicate an id is given
                //no need to post; just check if the id is valid
                case 'string':
                case 'integer': try {
                        const field_name = type === 'string' ? tbl_name.slice(0,-1)+'_id' : 'id'
                        const id = (await get_one(tbl_name, {[field_name]: body[tbl_name]})).id
                        if(!id) console.log(`${field_name} is invalid`)
                        else body[tbl_name] = [id]
                        break
                    } catch(err) {return (error = 'C0001')}
                //objects should have all required and unique fields
                case 'object': try {
                        const post = await check_post(res, tbl_name, body[tbl_name])
                        if(post.error) return post
                        else post_stack.push({table: tbl_name, body: post})
                        break
                    } catch(err) {
                        return {error: true, table: tbl_name, code: 'C0002'}
                    }
                case 'array': try {
                        console.log('an array was sent')
                    } catch(err) {
                        return {error: true, table: tbl_name, code: 'C0003'}
                    }
            }
        }
    }
    // console.log('body1', body)
    return post_stack
}

module.exports = async (req, res, next) => {
    switch(req.method) {
        case 'POST': {
            const stack = await multi_post(res, req.table, req.body)
            console.log('back in main')
            console.log('post stack', stack)
            if(stack.error) return send_error(res, stack.code, stack.table)
            // console.log('made it here')

            const {table} = get.path(req.originalUrl)
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