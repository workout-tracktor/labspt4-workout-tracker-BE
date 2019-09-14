//IMPORTS
const db = require('../../data/dbConfig')
const remove = require('../helpers/remove')
const replace = require('../helpers/replace')

//HELPERS
path = path => {
    let table = path.substr(1)
    let array = true
    if(table.substr(table.length - 1) !== 's') {
        table += 's'
        array = false
    }
    return {array, table}
}

columns = async table => {
    const schema = await db(table).columnInfo()
    return Object.keys(schema)
}

required = async table => {
    const not_required = ['id', table.slice(0, -1) + '_id', 'timestamp', 'created'] //move this to middleware
    const schema = await db(table).columnInfo()
    let required = []
    for(let key in schema) if(!schema[key].nullable) required.push(key)
    return required.remove(not_required)
}

body = (columns, body) => remove.extras(columns, body)

params = (columns, given) => {
    replace.values(given, '!', null)
    const settings = Object.assign({}, given)
    const query = Object.assign({}, given)
    const reserved = ['limit', 'start_at'] //move this to middleware
    remove.extras(columns, query)
    remove.extras(reserved, settings)
    return {settings, query}
}

//EXPORTS
module.exports = {
    path,
    columns,
    required,
    body,
    params,
}