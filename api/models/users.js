//IMPORTS
const db = require('../../data/dbConfig')

//VARIABLES
const db_name = 'users'

//MODELS
//create
//:adds a new
const add = async user => {
    await db(db_name).insert(users)
}

//read
//: returns all the users in the db
const get_all = async () =>
    await db(db_name)
//: takes in an object {first_name: 'Gordon'} returns first matched user
const get_by = async value =>
    await db(db_name).where(value).first()

//update
//: takes in an uid and user object > updates user > returns that user
const update_by_id = async (id, value) => {
    await db(db_name).where({uid: id}).update(value)
    return await get_by({uid: id})
}

//delete
//: takes in a uid > removes user
const remove_by_id = async id =>
    await db(db_name).where({uid: id}).delete()

//EXPORT
module.exports = {
    add,
    get_all,
    get_by,
    update_by_id,
    remove_by_id,
}