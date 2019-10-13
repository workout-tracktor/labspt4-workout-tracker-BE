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
const {unqiue_fields} = require('../config/unique_fields')

//content
module.exports = async (req, res, next) => {
    const {array, table} = get.path(req.originalUrl)
    const columns = await get.columns(table)
    const schema = get.schema(columns)
    const required = await get.required(table)
    const body = get.body(columns, req.body)
    const {settings, query} = get.params(columns, req.query)
    const method = req.method
    const time = (new Date()).getTime()
    
    req.data = {
        response: {},
        table: table,
        method: method,
        array: array,
        schema: schema,
        required: required,
        settings: settings,
        unique: unqiue_fields[table],
        query: query,
        body: body,
        time: time,
    }

    next()
}