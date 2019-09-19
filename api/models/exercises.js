//IMPORTS
const db = require('../../data/dbConfig')

//VARIABLES
const db_dame = 'exercises'

//MODELS
//create
//:add a new exercise
const add = async exercise => await db(db_dame).insert(exercise)

//read
//:returns an array of all exercises
const get_all = async () => await db(db_dame)

//returns an array of exercises fitting a set of requirements
const get_all_by = async obj => await db(db_dame).where(obj)

//:returns a single exercise fitting a set of  requirements
const get_by = async obj => await db(db_dame).where(obj).first()

//update
//:updates a exercise with a specific id
const update_by_id = async (id, obj) => {
    await db(db_dame).where({id: id}).update(obj)
    return await get_by({id: id})
}

//delete
//:terminates a exercise
const remove_by_id = async (id) => await db(db_dame).where({id: id}).delete()

//EXPORT
module.exports = {
    add,
    get_all,
    get_all_by,
    get_by,
    update_by_id,
    remove_by_id,
}