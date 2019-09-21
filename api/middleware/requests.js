//IMPORTS
//local
const {errors} = require('../helpers/errors')
const {add, get, get_all, update, remove, remove_all} = require('../models')

request = async (req, res, next) => {
    switch(req.data.method) {
        case 'POST': {
            try {
                req.data.response = await add(req.data.table, req.data.prepared)
            } catch(err) {
                const error = errors(err.code, req.data.table)
                res.status(error.status).json(error)
            }
            break
        }
        case 'GET': {
            try {
                req.data.response = req.data.array
                ? await get_all(req.data.table, {})
                : await get(req.data.table, req.data.query)
            } catch(err) {
                const error = errors(err.code, req.data.table)
                res.status(error.status).json(error)
            }
            break
        }
        case 'PUT': {
            try {
                req.data.response = await update(req.data.table, req.data.id, req.data.body)
            } catch(err) {
                const error = errors(err.code, req.data.table)
                res.status(error.status).json(error)
            }
        }
        case 'DELETE': {
            try {
                req.data.response = req.data.array
                ? await remove_all(req.data.table, req.data.id)
                : await remove(req.data.table)
            } catch(err) {
                const error = errors(err.code, req.data.table)
                res.status(error.status).json(error)
            }
        }
    }

    next()
}



module.exports = {
    request
}