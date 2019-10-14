const {merge} = require('./helpers/replace')
const uuid = require('uuid')
const get = require('./helpers/get')

const id = async (table, body, query) => {
    const field_name = table.slice(0,-1) + '_id'
    if(query[field_name]) {
        return await get.id(table, field_name, query[field_name])
    }
}

module.exports = async (req, res, next) => {
    switch(req.method) {
        case 'POST': {
            if(req.table === 'users') req.body.user_id = uuid.v4()
            const time = (new Date()).getTime()
            req.body.created = time
            req.body.updated = time
            req.status = 201
            
            next()
            break
        }
        case 'GET': {
            next()
            break
        }
        case 'PUT': 
            req.body.updated = req.time
        case 'DELETE': {
            req.data.id = await id(req.table, req.body, req.query)
            // console.log('rid', req.data.id)
            next()
            break
        }
    }
}