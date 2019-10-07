/*


What is do?
Checks to see if post requests have both required and unique fields.
Checks put and delete for id field
*/
//imports
const get = require('../helpers/get')
const check = require('../helpers/check')
const {unqiue_fields} = require('../../config/unique_fields')

const post_requirements = async (table, body) => {
    //check if all required fields are provided
    const not_required = ['created', 'updated']
    const required_fields = (await get.required(table)).filter(field => not_required.indexOf(field) === -1)
    const missing_fields = required_fields.filter(field => !body.hasOwnProperty(field))
    if(missing_fields.length > 0) console.log('send error', missing_fields)

    const unique_fields = unqiue_fields[table]
    const unremarkable_fields = (await check.unique(table, body, unique_fields))
    console.log(unremarkable_fields)

    
    // console.log('req', required_fields, unique_fields)
}

const constraints = async (req, res, next) => {
    switch(req.method) {
        case 'POST': post_requirements(req.data.table, req.body); break
        case 'GET': next(); break
        case 'PUT': console.log('PUT'); break
        case 'DELETE': console.log('DELETE'); break
    }
    next()
}

module.exports = {
    constraints
}