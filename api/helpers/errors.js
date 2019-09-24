//IMPORTS

const send_error = (res, code, table, fields, expected) => {
    // console.log(code, table, fields, expected)
    const error = {}
    if(code) error.code = Number(code)
    if(table) error.table = table
    if(fields) error.problem_fields = fields
    if(expected) error.expected = expected
    error.status = 418

    switch(error.code) {
        //database errors
        case 23502: error.status = 500; error.detail = `Requirements not met.`; break
        case 23503: error.status = 500; error.detail = `Foreign key violation; cannot remove without first removing connected data.`; break
        case 23505: error.status = 500; error.detail = `Unremarkable fields.`; break
        //custom errors
        case 61200: error.status = 406; error.detail = `No content available following the criteria given.`; break
        case 61201: error.status = 406; error.detail = `Was not given a ${fields} field.`; break
        case 61202: error.status = 404; error.detail = `${fields} could not be found.`; break
        //default
        default: error.status = 613; error.detail = `Backend broked, unknown error.`
    }

    res.status(error.status).json(error)
}

module.exports = {
    send_error
}

/*COMMON POSTGRES ERROR CODES
23502 - requirement not met
23505 - unique contraint
*/