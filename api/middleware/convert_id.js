/*
        __   __        ___            __   ___ 
|\/| | |  \ |  \ |    |__  |  |  /\  |__) |__  
|  | | |__/ |__/ |___ |___ |/\| /~~\ |  \ |___ 
   __
| |  \
| |__/

What it supposed to do?
convert user_id to id
*/
//imports
const {get} = require('../models')


const convert_id = async (req, res, next) => {
    // console.log(req.data)
    if(req.data.table === 'users' && !req.data.array) {
        const user = await get(req.data.table, {user_id: req.data.query.user_id})
        console.log('user', user)
        if(req.data.query.user_id) console.log('yerp')
        console.log(req.data.body.user_id)
    }

    next()
}

module.exports = {
    convert_id
}