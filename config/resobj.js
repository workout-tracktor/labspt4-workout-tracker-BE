const responses = {
    users: {
        user_id: '',
        username: '',
        email: '',
        body_goal: '',
        first_name: '',
        last_name: '',
        weight_units: 'name',
        // weight_units: {table: 'units', fields: ['name'], type: 'string'},
        distance_units: [{name: '', unit_id: ''}],
        avatar: '',
        created: '',
        updated: ''
    }
}

module.exports = {
    responses
}