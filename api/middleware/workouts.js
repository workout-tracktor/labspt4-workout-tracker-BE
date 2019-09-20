//IMPORTS
//local
const db = require('../../data/dbConfig')

//: takes exercise_ids and grabs their corresponding id then replaces the exercise_ids
exercise_ids = async (req, res, next) => {
    const get = async(obj) => await Promise.resolve(db('exercises').select('id').where(obj).first())
    let ids = (await Promise.all(req.data.body.exercise_ids.map(async id => await get({exercise_id: id}))))
    req.data.body.exercise_ids = ids.map(id => id.id)

    next()
}

//EXPORT
module.exports = {
    exercise_ids
}