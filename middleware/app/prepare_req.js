const {merge} = require('../../api/helpers/replace')
const uuid = require('uuid')

module.exports = async (req, res, next) => {
    switch(req.method) {
        case 'POST': {
            if(req.data.table === 'users') req.body.user_id = uuid.v4()
            const time = (new Date()).getTime()
            req.body.created = time
            req.body.updated = time
            req.status = 201
            // console.log(req.data)
            break
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