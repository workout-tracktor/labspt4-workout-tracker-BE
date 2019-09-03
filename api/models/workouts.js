//IMPORTS
const db = require('../../data/dbConfig')

//VARIABLES
const db_name = 'workouts'

//MODELS
//create
//:add new workout
const add = async workout => {
    await db(db_name).insert(workout)
    return get_by({id: workout.id})
}

//read
//:returns all the workouts in the db
const get_all = async () => await db(db_name)

//:takes in an object {workout_name: 'ab destroyer'} returns first matched workout
const get_by = async value =>
    await db(db_name).where(value).first()

//update
//:takes in a wid and workout object > updates workout > returns workout
const update_by_wid = async (wid, value) => {
    await db(db_name).where({wid: wid}).update(value)
    return await get_by(value)
}

//delete
//:take in a wid > removes workout
const remove_by_wid = async (wid, value) => {
    const workout = await get_by({wid: wid})
    await db(db_name).where({wid: wid}).delete()
    return workout
}

//EXPORT
module.exports = {
    add,
    get_all,
    get_by,
    update_by_wid,
    remove_by_wid,
}