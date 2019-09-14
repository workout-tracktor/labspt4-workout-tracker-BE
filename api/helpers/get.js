//IMPORTS
const db = require('../../data/dbConfig')
const remove = require('../helpers/remove')

//HELPERS
path = req => {
    let table = req.route.path.substr(1)
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
    const not_required = ['id', table.slice(0, -1) + '_id', 'timestamp', 'created']
    const schema = await db(table).columnInfo()
    let required = []
    for(let key in schema) if(!schema[key].nullable) required.push(key)
    return required.remove(not_required)
}

body = (columns, body) => remove.extras(columns, body)

params = (columns, given) => {
    const settings = Object.assign({}, given)
    const query = Object.assign({}, given)
    const reserved = ['limit', 'start_at']
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