//IMPORTS
const db = require('../../data/dbConfig')

//VARIABLES
const db_dame = 'users'

//MODELS
//create
//:add a new user
const add = async user => {
    return await db(db_dame).insert(user)
}

//read
//:returns an array of all users
const get_all = async () => await db(db_dame)

//:returns a single user
const get_by = async obj => await db(db_dame).where(obj).first()

//EXPORT
module.exports = {
    add,
    get_all,
    get_by
}