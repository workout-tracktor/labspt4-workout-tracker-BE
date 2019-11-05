exports.up = (knex) =>
    knex.schema.createTable('sets', tbl => {
        tbl.increments('id')
            .unique()
            .notNullable()
            .primary()
        tbl.float('weight')
        tbl.integer('exercise_id')
            .references('id')
            .inTable('exercises')
            .notNullable()
        tbl.text('workout_type')
            .notNullable()
        tbl.integer('weight_units')
            .references('id')
            .inTable('units')
        tbl.float('distance')
        tbl.integer('distance_units')
            .references('id')
            .inTable('units')
        tbl.float('time')
        tbl.integer('time_units')
            .references('id')
            .inTable('units')
        tbl.integer('reps')
        tbl.text('date')
            .notNullable()
        tbl.timestamps(true, true)
    })

exports.down = (knex) =>
    knex.schema.dropTableIfExists('sets')
