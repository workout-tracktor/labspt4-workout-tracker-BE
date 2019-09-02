//IMPORTS
const crypt = require('bcryptjs')
const uuid = require('uuid')
//local
const jwtGenToken = require('../helpers/jwt_token_gen')
const check = require('../helpers/check')
const retrieve = require('../helpers/retreive')
const misc = require('../helpers/misc')

//LOGIN
//:
authenticate = async (req, res, next) => {
    const required_fields = ['username', 'password']

    //check if all required keys are provided
    if(!check.required(req.body, ...required_fields))
        return res.status(500).json({error: `The required fields are: ${required_fields}.`})

    //rebuild reqbody, removing any possible extra fields
    req.body = {
        username: req.body.username,
        password: req.body.password
    }

    next()
}
//:
username_exists = async (req, res, next) => {
    const user = await retrieve.user_by({username: req.body.username})
    if(!user)
        return res.status(404).json({error: `Username ${req.body.username} couldn't be found.`})

    next()
}
//:
password_matches = async (req, res, next) => {
    const user = await retrieve.user_by({username: req.body.username})
    if(user) {
        if(crypt.compareSync(req.body.password, user.password))
            req.authorization = jwtGenToken(user)
        else
            return res.status(403).json({error: `Try the right password next time dumbass.`})
    }

    next()
}
//REGISTER
//:
register = async (req, res, next) => {
    //check if all required fields are provided
    const required_fields = await retrieve.required_list('users')
    required_fields.remove('id', 'uid')
    if(!check.required(req.body, ...required_fields))
        return res.status(500).json({error: `The required fields are: ${required_fields}.`})
    
    //check unqiue fields
    const unique_fields = ['username', 'email']
    let message = ''
    let flag = false
    let fields = []
    await Promise.all(unique_fields.map(async (field) => {
        if(await retrieve.user_by({[field]: req.body[field]})) {
            message = `${field} ${req.body[field]} is currently in use.`
            fields.push(field)
            flag = true
        }
    }))
    if(flag) return res.status(612).json({error: message, invalid_fields: fields})

    //calculates id of new user
    const id = await retrieve.new_id('users')

    //get timestamp
    const now = new Date()

    //rebuild reqbody, removing any possible extra fields
    req.body = {
        id: id,
        uid: uuid.v4(),
        username: req.body.username,
        email: req.body.email,
        password: crypt.hashSync(req.body.password, 1),
        start_date: now,
    }

    next()
}

//EXPORTS
module.exports = {
    register,
    authenticate,
    username_exists,
    password_matches,
}