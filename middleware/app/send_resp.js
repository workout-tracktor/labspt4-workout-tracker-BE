module.exports = async (req, res, next) => {
    console.log('made it to send resp')
    console.log('r', req.data.response)
    // try {
    //     res.status(200).json(req.data.response)
    // } catch(err) {
    //     console.log(err)
    // }
    // }, 10)
    // console.log('resp', req.data.response)
    // console.log('ssss', req.status)
    // res.status(req.status).json(req.data.response)

}