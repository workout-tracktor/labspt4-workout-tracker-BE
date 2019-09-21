//IMPORTS

const errors = (code, table, fields, expected) => {
    const error = {}
    if(code) error.code = code
    if(table) error.table = table
    if(fields) error.fields = fields
    if(expected) error.expected = expected
    error.status = 418

    switch(code) {
        //database errors
        case '23502': error.status = 500; error.detail = 'Requirements not met.'; break
        case '23505': error.status = 500; error.detail = 'Unremarkable fields.'; break
        //custom errors
        case '61200': error.status = 406; error.detail = 'Not content available following the criteria given.'; break

        default: error.status = 612; error.detail = 'Backend broked, unknown error.'
    }

    return error
}

module.exports = {
    errors
}

/*COMMON POSTGRES ERROR CODES
23502 - requirement not met
23505 - unique contraint
*/