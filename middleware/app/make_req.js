const {add, get, get_all, update, remove, remove_all} = require('../../api/models')
const {send_error} = require('../../api/helpers/errors')

module.exports = async (req, res, next) => {
    switch(req.data.method) {
        case 'POST': {
            try {
                req.data.response = await add(req.data.table, req.body)
            } catch (err) {
                return send_error(res, err.code, req.data.table)
            }
        }
    }

    next()
}