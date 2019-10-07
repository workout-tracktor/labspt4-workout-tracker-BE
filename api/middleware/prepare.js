const {get, get_all} = require('../models')
const {responses} = require('../../config/resobj')

const fill_struct = async (struct, values) => {
    const res = {}
    for(const key of Object.keys(struct)) {
        const type = Array.isArray(struct[key]) ?  'array' : typeof struct[key]
        const tbl = key.split('_')[key.split('_').length-1]
        switch(type) {
            case 'string': {
                if(struct[key]) res[key] = (await get(tbl, {id: values[key]}))[struct[key]]
                else res[key] = values[key]
                break
            }
            case 'object': {
                const row = await get(tbl, {id: values[key]})
                res[key] = await fill_struct(struct[key], row)
                break
            }
            case 'array': {
                const rows = await get_all(tbl, {})
                res[key] = []
                switch(typeof struct[key][0]) {
                    case 'string': {
                        for(const idx in rows) {
                            res[key].push((await fill_struct({[struct[key][0]]: ''}, rows[idx], tbl))[struct[key][0]])
                        }
                        break;
                    }
                    case 'object': {
                        for(const idx in rows) {
                            const that = await fill_struct(struct[key][0], rows[idx], tbl)
                            res[key].push(that)
                        }
                        break;
                    }
                }
                break
            }
        }
    }
    return res
}

prepare = async (req, res, next) => {
    const struct = responses[req.data.table]
    const dbres = req.data.response

    try {
        req.data.response = await fill_struct(struct, dbres)
    } catch(err) {
        console.log(err)
    }
    console.log('res', req.data.response)
    next()
}

//EXPORTS
module.exports = {
    prepare
}