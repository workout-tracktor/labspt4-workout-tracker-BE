const {merge} = require('../../api/helpers/replace')
const uuid = require('uuid')

module.exports = async (req, res, next) => {
    switch(req.method) {
        case 'POST': {
            if(req.data.table === 'users') req.body.user_id = uuid.v4()
            req.body.created = (new Date()).getTime()
            req.status = 201
        }
        case 'GET': {
            // req.status = 200
            break
        }
        case 'PUT': {
            req.body = merge(req.data.schema, req.body)
            req.body.updated = (new Date()).getTime()
            break
        }
    }

    next()
}