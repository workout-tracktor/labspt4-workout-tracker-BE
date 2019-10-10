exports.up = (knex) =>
    knex.schema.createTable('logs', tbl => {
        tbl.increments('id')
            .unique()
            .notNullable()
            .primary()
        tbl.text('user_id')
            .references('user_id')
            .inTable('users')
            .notNullable()
        tbl.integer('workout_id')
            .references('id')
            .inTable('workouts')
            .notNullable()
        tbl.integer('exercise_id')
            .references('id')
            .inTable('exercises')
            .notNullable()
        tbl.integer('distance_units_id')
            .references('id')
            .inTable('units')
        tbl.integer('weight_units_id')
            .references('id')
            .inTable('units')
        tbl.integer('reps')
        tbl.float('distance')
        tbl.float('weight')
        tbl.integer('duration')
        tbl.bool('workout_complete')
            .notNullable()
            .defaultTo(false)
        tbl.bigint('created')
            .notNullable()
        tbl.bigint('updated')
            .notNullable()
    })

exports.down = (knex) =>
    knex.schema.dropTableIfExists('logs')
