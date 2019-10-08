const {merge} = require('../helpers/replace')
const uuid = require('uuid')

const prepare_req = (req, res, next) => {
    switch(req.method) {
        case 'POST': {
            if(req.data.table === 'users') req.body.user_id = uuid.v4()
            req.body.created = (new Date()).getTime()
        }
        case 'PUT': {
            req.body = merge(req.data.schema, req.body)
            req.body.updated = (new Date()).getTime()
            break
        }
    }

    next()
}

module.exports = {
    prepare_req
}