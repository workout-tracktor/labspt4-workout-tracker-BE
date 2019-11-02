exports.up = (knex) =>
    knex.schema.createTable('exercises', tbl => {
        tbl.increments('id')
            .unique()
            .notNullable()
            .primary()
        tbl.text('name')
            .unique()
            .notNullable()
        tbl.text('user_id')
            .references('user_id')
            .inTable('users')
        tbl.specificType('sets', 'INT[]')
        tbl.integer('equipment_id')
            .references('id')
            .inTable('equipments')
        tbl.text('description')
        tbl.bool('completed')
        tbl.text('workout_type')
        tbl.text('date')
            .notNullable()
        tbl.timestamps(true, true)
    })

exports.down = (knex) =>
    knex.schema.dropTableIfExists('exercises')