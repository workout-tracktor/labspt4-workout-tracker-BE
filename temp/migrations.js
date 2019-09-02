//not needed?

exports.up = function(knex) {
    return knex.schema(createTable('users', tbl => {
        tbl.integer('id').increments().notNullable().primary()
        tbl.string('uid').unique().notNullable()
        tbl.string('username').unique().notNullable()
        tbl.string('password').notNullable()
        tbl.string('email').unique()
        tbl.string('first_name')
        tbl.string('last_name')
        tbl.string('gender')
        tbl.string('avatar_src')
        tbl.float('weight')
        tbl.string('weight_units')
        tbl.float('height')
        tbl.string('height_units')
        tbl.string('body_goal')
        tbl.time('date_joined')
        tbl.timestamps(true, true)
    }))
}

exports.down = knex =>
    knex.schema.dropTableIfExists('users')