// __   __  _______  _______  ______      __   __  _______  ______   _______  ___      _______ 
//|  | |  ||       ||       ||    _ |    |  |_|  ||       ||      | |       ||   |    |       |
//|  | |  ||  _____||    ___||   | ||    |       ||   _   ||  _    ||    ___||   |    |  _____|
//|  |_|  || |_____ |   |___ |   |_||_   |       ||  | |  || | |   ||   |___ |   |    | |_____ 
//|       ||_____  ||    ___||    __  |  |       ||  |_|  || |_|   ||    ___||   |___ |_____  |
//|       | _____| ||   |___ |   |  | |  | ||_|| ||       ||       ||   |___ |       | _____| |
//|_______||_______||_______||___|  |_|  |_|   |_||_______||______| |_______||_______||_______|

//IMPORTS
const db = require('../../data/dbConfig')

//VARIABLES
const db_dame = 'users'

//MODELS

//create
//:add a new user
const add = async user => await db(db_dame).insert(user)

//read
//:returns an array of all users
const get_all = async () => await db(db_dame)

//:returns an array of users fitting a set of requirments
const get_all_by = async obj => await db(db_dame).where(obj)

//:returns a single user fitting a set of requirments
const get_by = async obj => await db(db_dame).where(obj).first()

//:updates a user with a specific
const update_by_id = async (id, obj) => await db(db_name).where({id: id}).update(obj)

//:terminates a user
const remove_by_id = async (id) => await db(db).where({id: id}).delete()

//EXPORT
module.exports = {
    add,
    get_all,
    get_all_by,
    get_by,
    update_by_id,
    remove_by_id
}