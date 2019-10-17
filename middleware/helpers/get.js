//IMPORTS
const db = require('../../data/dbConfig')
const remove = require('../helpers/remove')
const replace = require('../helpers/replace')

//HELPERS
schema = columns => 
    columns
        .filter(val => val !== 'id')
        .reduce((obj,val) => (obj[val]=null,obj), {})

path = path => {
    let table = path.split('/')[2].split('?')[0]
    let array = true
    if(table.substr(table.length - 1) !== 's') {
        table += 's'
        array = false
    }
    return {array, table}
}

tables = async () =>
    await db.raw(`SELECT table_name FROM information_schema.tables WHERE table_schema='public'`)
        .then(schema => schema.rows.filter(table => !table.table_name.includes('knex_'))
        .map(table => table.table_name))

unique = async table =>
    await db.raw(`select constraint_name from information_schema.table_constraints WHERE table_name='${table}' AND constraint_type='UNIQUE'`)
        .then(constraints => constraints.rows)
        .map(row => row.constraint_name.split('_').filter(word => word !== table && word !== 'unique').join('_'))

columns = async table =>
    Object.keys(await db(table).columnInfo())

required = async table => {
    const not_required = ['id', table.slice(0, -1) + '_id', 'timestamp'] //move this to middleware
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

id_helper = async (table, field_name, id) => {
    await db(table).select('id')
}

id = async (table, body, query) => {
    let id = ''
    const field_name = table.slice(0,-1) + '_id'
    const ids = [query[field_name], query.id, body[field_name], body.id]
        .filter(id => id)
        .map(id => {return {field_name: Number.isInteger(id) ? 'id' : field_name, id: id}})
    for(let i=0; i<ids.length; i++) {
        id = await db(table).select('id').where({[ids[i].field_name]: ids[i].id}).first()
        if(id) break
    }
    if(id) return id.id
    else return false
}

//EXPORTS
module.exports = {
    path,
    columns,
    required,
    body,
    params,
    id,
    schema,
    unique,
}