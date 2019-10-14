/*
        __   __        ___            __   ___ 
|\/| | |  \ |  \ |    |__  |  |  /\  |__) |__  
|  | | |__/ |__/ |___ |___ |/\| /~~\ |  \ |___ 
 __       ___                                   
|  \  /\   |   /\                               
|__/ /~~\  |  /~~\

//**What it do?
\\**Gathers information about the route and the table it's attached to.

*/
//imports
const get = require('./helpers/get')

//content
module.exports = async (req, res, next) => {
    const {array, table} = get.path(req.originalUrl)
    req.array = array
    req.table = table
    req.time = time = (new Date()).getTime()

    switch(req.method) {
        case 'POST':
        case 'PUT':
            const columns = await get.columns(req.table)
            req.body = get.body(columns, req.body)
    }

    next()
}