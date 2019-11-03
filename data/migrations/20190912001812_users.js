
exports.up = (knex) =>
    knex.schema.createTable('users', tbl => {
        tbl.increments('id')
            .primary()
            .unique()
            .notNullable()
        tbl.text('user_id')
            .unique()
            .notNullable()
        tbl.text('username')
            .unique()
            .notNullable()
        tbl.text('password')
            .notNullable()
        tbl.text('email')
            .unique()
            .notNullable()
        tbl.text('body_goal')
        tbl.text('first_name')
        tbl.text('last_name')
        tbl.text('units_system')
            .notNullable()
        tbl.text('avatar')
        tbl.text('date')
            .notNullable()
        tbl.timestamps(true, true)
    })

exports.down = (knex) =>
    knex.schema.dropTableIfExists('users')
