const crypt = require('bcryptjs')

const encrypt = (req, res, next) => {
    if(req.body.hasOwnProperty('password'))
        req.body.password = crypt.hashSync(req.body.password, 1)
    next()
}

module.exports = {
    encrypt
}