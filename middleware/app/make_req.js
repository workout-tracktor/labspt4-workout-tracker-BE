const {add, get, get_all, update, remove, remove_all} = require('../../api/models')
const {send_error} = require('../../api/helpers/errors')

module.exports = async (req, res, next) => {
    switch(req.data.method) {
        case 'POST': {
            try {
                req.data.response = await add(req.data.table, req.body)
                if(!req.data.response) return send_error(res, '61204', req.data.table)
            } catch (err) {
                return send_error(res, err.code, req.data.table)
            }
        }
        case 'GET': {
            try {
                if(req.data.array) {
                    req.data.response = await get_all(req.data.table, req.data.query)
                    req.status = 200
                    // req.data.response = {nope: 'nope'}
                    console.log('make req GET all')
                    // console.log('res all', req.data.response)
                    next()
                }
            } catch (err) {
                return send_error(res, err.code, req.data.table)
            }
        }
    }

    // console.log('resp0', req.data.response)
    // next()
}