const modelUsers = require('../models/users')

//user is a username
user_by_username = async (username) => {
    const user = await modelUsers.get_user_by({username: username})
    if(user) return user
    else return false
}
//email is a user email
user_by_email = async (email) => {
    const user = await modelUsers.get_user_by({email: email})
    if(user) return user
    else return false
}

module.exports = {
    user_by_username,
    user_by_email,
}