const {add, get, get_all, update, remove, remove_all} = require('../../api/models')
const {send_error} = require('../../api/helpers/errors')

// const prepare_resp = require('./prepare_res')

module.exports = async (req, res, next) => {
    switch(req.data.method) {
        case 'POST': {
            try {
                req.data.response = await add(req.data.table, req.body)
                if(!req.data.response) return send_error(res, '61204', req.data.table)
                next()
            } catch (err) {
                return send_error(res, err.code, req.data.table)
            }
            break
        }
        case 'GET': {
            try {
                if(req.data.array) {
                    get_all(req.data.table, req.data.query)
                        .then(res => {
                            req.data.response = res
                            next()
                        })
                } else {
                    get(req.data.table, req.data.query)
                        .then(res => {
                            req.data.response = res
                            next()
                        })
                }
            } catch (err) {
                // console.log('err', err)
            }
            break
        }
        case 'PUT': {
            update(req.data.table, req.data.id, req.body).then(res => {
                req.data.response = res
                next()
            })
            break
        }
        case 'DELETE': {
            if(req.data.array) {
                remove_all(req.data.table).then(res => {
                    req.data.response = `Everything has been terminated!`
                    next() 
                })
            } else {
                remove(req.data.table, req.data.id).then(res => {
                    req.data.response = res
                    next()
                })
            }
        }
    }

    // next()
}