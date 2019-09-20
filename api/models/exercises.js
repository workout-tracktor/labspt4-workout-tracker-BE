//IMPORTS
const db = require('../../data/dbConfig')

//VARIABLES
const db_name = 'exercises'

//MODELS
//create
//:add a new exercise
const add = async exercise => {
    await db(db_name).insert(exercise)
        // await db.raw(`INSERT INTO exercises (name, exercise_id, equipment_id) VALUES ('bob2', 'three', 2)`)
        // await db(db_name).insert({
        //     exercise_id: 'one2',
        //     name: 'test2',
        //     equipment_id: db(db_name).raw([1,2,3])
        // })
    return await db(db_name).where({name: exercise.name})
}

//read
//:returns an array of all exercises
const get_all = async () => await db(db_name)

//returns an array of exercises fitting a set of requirements
const get_all_by = async obj => await db(db_name).where(obj)

//:returns a single exercise fitting a set of  requirements
const get_by = async obj => {
    const exercise = await db(db_name)
    const equipment = await db('equipments').where({id: 2})
    exercise.equipment = equipment
    return exercise
}
// const get_by = async obj => {
//     try {
//         const that = await db.select('*').from(db_name)
//             .then(async exercises => {
//                 await exercises.map(async exercise => {
//                     exercise.equipment = await db('equipments').where({id: Number(exercise.equipment_id)}).first()
//                     console.log('exer', exercise)
//                 })
//                 console.log('exers', exercises)
//             })
//             .catch(err => console.log('err', err))
//         return that
//     } catch(err) {console.log(err)}
// }

//update
//:updates a exercise with a specific id
const update_by_id = async (id, obj) => {
    await db(db_name).where({id: id}).update(obj)
    return await db(db_name).where({id: id}).first()
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