const {add, get, get_all, update, remove, remove_all} = require('../config/models')
const {send_error} = require('./helpers/errors')

module.exports = async (req, res, next) => {
    switch(req.method) {
        case 'POST': {
            try {

                req.response = await add(req.table, req.body)
                if(!req.response) return send_error(res, '61204', req.table)

                next()
            } catch (err) {
                console.log('err', err)
                return send_error(res, err.code, req.table)
            }
            break
        }
        case 'GET': {
            if(req.array) {
                get_all(req.table, req.query).then(record => {
                    req.response = record
                    record ? next() : send_error(res, 'P0002', req.table)
                })
            } else {
                get(req.table, req.query).then(records => {
                    req.response = records
                    records ? next() : send_error(res, 'P0002', req.table)
                })
            }
            break
        }
        case 'PUT': {
            update(req.table, req.id, req.body).then(res => {
                console.log('made it here', res)
                req.response = res
                next()
            })
            break
        }
        case 'DELETE': {
            if(req.array) {
                remove_all(req.table).then(res => {
                    req.response = `Everything has been terminated!`
                    next() 
                })
            } else {
                remove(req.table, req.id).then(res => {
                    req.response = res
                    next()
                })
            }
        }
    }
}