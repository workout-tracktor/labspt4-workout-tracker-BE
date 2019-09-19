//IMPORTS
const db = require('../../data/dbConfig')

//VARIABLES
const db_dame = 'units'

//MODELS
//create
//:add a new unit
const add = async unit => await db(db_dame).insert(unit)

//read
//:returns an array of all units
const get_all = async () => await db(db_dame)

//returns an array of units fitting a set of requirements
const get_all_by = async obj => await db(db_dame).where(obj)

//:returns a single unit fitting a set of  requirements
const get_by = async obj => await db(db_dame).where(obj).first()

//update
//:updates a unit with a specific id
const update_by_id = async (id, obj) => {
    await db(db_dame).where({id: id}).update(obj)
    return await get_by({id: id})
}

//delete
//:terminates a unit
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