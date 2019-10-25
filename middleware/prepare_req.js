const uuid = require('uuid')
const get = require('./helpers/get')

module.exports = async (req, res, next) => {
    switch(req.method) {
        case 'POST': {
            const {table} = get.path(req.originalUrl)
            const columns = await get.columns(table)
            const time = (new Date()).getTime()
            req.table = table
            req.body = get.body(columns, req.body)
            if(req.table === 'users') req.body.user_id = uuid.v4()
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