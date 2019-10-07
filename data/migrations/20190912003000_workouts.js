exports.up = (knex) =>
    knex.schema.createTable('workouts', tbl => {
        tbl.increments('id')
            .unique()
            .notNullable()
            .primary()
        tbl.text('name')
            .unique()
            .notNullable()
        tbl.specificType('exercise_ids', 'INT[]')
        tbl.specificType('exercise_description', 'text[]')
        tbl.text('description')
        tbl.bigint('created_at')
            .notNullable()
        tbl.bigint('updated_at')
            .notNullable()
    })

exports.down = (knex) =>
    knex.schema.dropTableIfExists('workouts')