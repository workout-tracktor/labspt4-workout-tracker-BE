const {add_one, get_one, get_all, update_one, remove_one, remove_all} = require('../config/models')
const {send_error} = require('./helpers/errors')
const {tables} = require('./helpers/get')

module.exports = async (req, res, next) => {
    switch(req.method) {
        case 'POST': {
            try {
                //loops through the stack, stores the last item (the initial item called) in the response
                req.response = {}
                for(let i=0; i<req.stack.length; i++) {
                    req.response = await add_one(req.stack[i].table, req.stack[i].body)
                }
                if(!req.response) return send_error(res, '61204', req.table)
                req.status = 201
                next()
            } catch (err) {
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
                get_one(req.table, req.query).then(records => {
                    req.response = records
                    records ? next() : send_error(res, 'P0002', req.table)
                })
            }
            break
        }
        case 'PUT': {
            update_one(req.table, req.id, req.body).then(res => {
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
                remove_one(req.table, req.id).then(res => {
                    req.response = res
                    next()
                })
            }
        }
    }
}