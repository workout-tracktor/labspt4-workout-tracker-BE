//IMPORTS
//local

//:
conversion_therapy = (req, res, next) => {
    if(req.body.family_name) req.body.last_name = req.body.family_name
    if(req.body.given_name) req.body.first_name = req.body.given_name
    if(req.body.nickname) req.body.username = req.body.nickname
    if(req.body.picture) req.body.avatar = req.body.picture
    if(req.body.sub) req.body.user_id = req.body.sub
    req.route.path = '/user'
    req.body.password = 'drowssap'

    next()
}

//EXPORTS
module.exports = {
    conversion_therapy,
}