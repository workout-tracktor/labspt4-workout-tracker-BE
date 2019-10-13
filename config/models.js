//IMPORTS
const db = require('../data/dbConfig')

//MODELS

//CREATE
//:adds and returns new row to given table
const add = async (tbl, obj) => {
    await db(tbl).insert(obj)
    return await db(tbl).where(obj).first()
}

//READ
//:returns a single row from the given table fitting a set of requirements
const get = async (tbl, obj) => {
    const user = await db(tbl).where(obj).first()
    return user
}
//:returns an array of all rows from a given table fitting a set of requirements
const get_all = async (tbl, obj) => await db(tbl).where(obj)

//UPDATE
//:updates and returns a row with given id from the given table 
const update = async (tbl, id, obj) => {
    await db(tbl).where({id: id}).update(obj)
    return await get(tbl, {id: id})
}

//DELETE
//:terminates a row with given id from the given table
const remove = async (tbl, id) => {
    const obj = get(tbl, {id: id})
    await db(tbl).where({id: id}).delete()
    return obj
}
//:terminate all rows from given table
const remove_all = async (tbl) => await db(tbl).delete()

module.exports = {
    add,
    get,
    get_all,
    update,
    remove,
    remove_all
}