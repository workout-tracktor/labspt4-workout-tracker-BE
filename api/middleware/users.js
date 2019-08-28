//IMPORTS
const crypt = require('bcryptjs')
const uuid = require('uuid')
//local
const jwtGenToken = require('../helpers/jwt_token_gen')
const check = require('../helpers/check')
const retrieve = require('../helpers/retreive')

//LOGIN
//:
authenticate = async (req, res, next) => {
    const required_fields = ['username', 'password']

    //check if all required keys are provided
    if(!check.required(req.body, ...required_fields))
        return res.status(500).json({message: `The required fields are: ${required_fields}.`})

    //rebuild reqbody, removing any possible extra fields
    req.body = {
        username: req.body.username,
        password: req.body.password
    }

    next()
}
//:
username_exists = async (req, res, next) => {
    const user = await retrieve.user_by_username(req.body.username)
    if(!user)
        return res.status(404).json({message: `Username ${req.body.username} couldn't be found.`})

    next()
}
//:
password_matches = async (req, res, next) => {
    const user = await retrieve.user_by_username(req.body.username)
    if(user) {
        if(crypt.compareSync(req.body.password, user.password))
            req.authorization = jwtGenToken(user)
        else
            return res.status(403).json({message: `Try the right password next time dumbass.`})
    }

    next()
}
//REGISTER
//:
register = async (req, res, next) => {
    const required_fields = ['username', 'password']

    //check if all required fields are provided
    if(!check.required(req.body, ...required_fields))
        return res.status(500).json({message: `The required fields are: ${required_fields}.`})
    
    //check if username is unique
    if(await retrieve.user_by_username(req.body.username))
        return res.status(612).json({message: `Username ${req.body.username} is currently is use.`})
    
    //check if email is unique

    //rebuild reqbody, removing any possible extra fields
    req.body = {
        uid: uuid.v4(),
        username: req.body.username,
        password: crypt.hashSync(req.body.password, 1)
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