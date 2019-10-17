const uuid = require('uuid')
const get = require('./helpers/get')
const check = require('./helpers/check')
const {add_one, get_one, get_all, update_one, remove_one, remove_all} = require('../config/models')
const {send_error} = require('./helpers/errors')

//update all models to get_one remove_one
const prepare_post = async (table, body) => {
    const {required_fields, missing_fields} = await requirements(table, body)
    // if(missing_fields.length > 0) 



}

const multi_post = async (res, table, body) => {
    console.log('body0', body)
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
                    console.log('object')
                } catch(err) {return (error = 'C0002')}
            }
        }
    }
    console.log('body1', body)
}

module.exports = async (req, res, next) => {
    switch(req.method) {
        case 'POST': {
            const error_code = await multi_post(res, req.table, req.body)
            // console.log('ec', error_code)
            if(error_code) return send_error(res, error_code)
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