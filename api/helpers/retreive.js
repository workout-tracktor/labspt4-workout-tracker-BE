const db = require('../../data/dbConfig')
const modelUsers = require('../models/users')

get_by = async (table, field) => {
    const data = await db(table).where(field).first()
    if(data) return data
    else return false
}

//gets list of required fields
required_list = async (table) => {
    const schema = await db(table).columnInfo()
    let list = []
    for(let key in schema) if(!schema[key].nullable) list.push(key)
    return list
}
//returns new id
new_id = async (table) => {
    return await db(table).max('id').first().then(value => ++value.max)
}

module.exports = {
    get_by,
    required_list,
    new_id,
}