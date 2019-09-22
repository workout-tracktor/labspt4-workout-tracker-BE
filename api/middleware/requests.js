//IMPORTS
//local
const {send_error} = require('../helpers/errors')
const {add, get, get_all, update, remove, remove_all} = require('../models')

request = async (req, res, next) => {
    switch(req.data.method) {
        case 'POST': {
            try {req.data.response = await add(req.data.table, req.data.prepared)}
            catch(err) { return send_error(res, err.code, req.data.table)}
            break
        }
        case 'GET': {
            try {
                req.data.response = req.data.array
                ? await get_all(req.data.table, {})
                : await get(req.data.table, req.data.query)
            } catch(err) {return send_error(res, err.code, req.data.table)}
            break
        }
        case 'PUT': {
            try {
                req.data.response = await update(req.data.table, req.data.id, req.data.body)}
            catch(err) {
                return send_error(res, err.code, req.data.table)}
            break
        }
        case 'DELETE': {
            try {
                if(req.data.array) {
                    await remove_all(req.data.table)
                    console.log('made it heere')
                    req.data.response = {success: `All targets have been eliminated.`}
                } else {
                    const removed = await remove(req.data.table, req.data.id)
                    const name = removed.name ? removed.name : removed.username ? removed.username : 'object'
                    req.data.response = {success: `${name} has been terminated.`}
                }
            } catch(err) {return send_error(res, err.code, req.data.table)}
            break
        }
    }

    next()
}

module.exports = {
    request
}