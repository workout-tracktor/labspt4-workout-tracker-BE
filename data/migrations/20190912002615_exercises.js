exports.up = (knex) =>
    knex.schema.createTable('exercises', tbl => {
        tbl.increments('id')
            .unique()
            .notNullable()
            .primary()
        tbl.text('exercise_id')
            .unique()
            .notNullable()
        tbl.text('name')
            .unique()
            .notNullable()
        tbl.integer('equipment_id')
            .references('id')
            .inTable('equipments')
        tbl.text('description')
    })

exports.down = (knex) =>
    knex.schema.dropTableIfExists('exercises')