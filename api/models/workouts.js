//IMPORTS
const db = require('../../data/dbConfig')

//VARIABLES
const db_name = 'workouts'

//MODELS
//create
//:add a new workout

/*
id
workout_id
exercise_id [int]
exercise_desc [str]
desc
complete		
*/

const add = async workout => {
    await db(db_name).insert(workout)
    return await db(db_name).where({name: workout.name})
}

//read
//:returns an array of all workouts
const get_all = async () => await db(db_name)

//returns an array of workouts fitting a set of requirements
const get_all_by = async obj => await db(db_name).where(obj)

//:returns a single workout fitting a set of  requirements
const get_by = async obj => await db(db_name).where(obj).first()

//update
//:updates a workout with a specific id
const update_by_id = async (id, obj) => {
    await db(db_name).where({id: id}).update(obj)
    return await db(db_name).where({id: id}).first()
}

//delete
//:terminates a workout
const remove_by_id = async (id) => await db(db_name).where({id: id}).delete()

//EXPORT
module.exports = {
    add,
    get_all,
    get_all_by,
    get_by,
    update_by_id,
    remove_by_id,
}