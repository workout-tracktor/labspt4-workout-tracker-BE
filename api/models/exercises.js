//IMPORTS
const db = require('../../data/dbConfig')

//VARIABLES
const db_name = 'exercises'

//MODELS
//create
//:add a new exercise
const add = async exercise => {
    try {
        await db(db_name).insert(exercise)
        // await db.raw(`INSERT INTO exercises (name, exercise_id, equipment_id) VALUES ('bob2', 'three', 2)`)
        // await db(db_name).insert({
        //     exercise_id: 'one2',
        //     name: 'test2',
        //     equipment_id: db(db_name).raw([1,2,3])
        // })
    } catch(err) {
        console.log(err)
    }
    return await db(db_name).where({name: exercise.name})
}

//read
//:returns an array of all exercises
const get_all = async () => await db(db_name)

//returns an array of exercises fitting a set of requirements
const get_all_by = async obj => await db(db_name).where(obj)

//:returns a single exercise fitting a set of  requirements
const get_by = async obj => await db(db_name).where(obj).first()

//update
//:updates a exercise with a specific id
const update_by_id = async (id, obj) => {
    await db(db_name).where({id: id}).update(obj)
    return await get_by({id: id})
}

//delete
//:terminates a exercise
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