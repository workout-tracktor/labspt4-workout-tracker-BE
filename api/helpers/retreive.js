const db = require('../../data/dbConfig')
const modelUsers = require('../models/users')

user_by = async (field) => {
    const user = await modelUsers.get_by(field)
    if(user) return true
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
    user_by,
    required_list,
    new_id,
}