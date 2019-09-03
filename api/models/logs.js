//IMPORTS
const db = require('../../data/dbConfig')

//VARIABLES
const db_name = 'logs'

//MODELS
//create
//:add new log
const add = async log => {
    await db(db_name).insert(log)
    return get_by({id: log.id})
}

//read
//:returns all the logs o./
const get_all = async () => await db(db_name)

//:returns all logs with given parameters
const get_all_by = async value =>
    await db(db_name).where(value)

//:takes in an object {uid: 57} returns first match
const get_by = async value =>
    await db(db_name).where(value).first()

//update
//:takes in a lid and log object > updates log > returns log
const update_by_lid = async (lid, value) => {
    await db(db_name).where({lid: lid}).update(value)
    return await get_by(value)
}

//delete
//:takes in a lid > removes log
const remove_by_lid = async (lid, value) => {
    const log = await get_by({lid: lid})
    await db(db_name).where({lid: lid}).delete()
    return log
}

//EXPORT
module.exports = {
    add,
    get_all,
    get_all_by,
    get_by,
    update_by_lid,
    remove_by_lid,
}