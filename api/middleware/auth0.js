//IMPORTS
//local

//:
conversion_therapy = (req, res, next) => {
    req.body.last_name = req.body.family_name
    req.body.first_name = req.body.given_name
    req.body.username = req.body.nickname
    req.body.avatar = req.body.picture
    req.body.user_id = req.body.sub
    req.route.path = '/user'
    req.body.password = 'drowssap'

    next()
}

//EXPORTS
module.exports = {
    conversion_therapy,
}