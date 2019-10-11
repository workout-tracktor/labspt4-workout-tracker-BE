exports.up = (knex) =>
    knex.schema.createTable('sets', tbl => {
        tbl.increments('id')
            .unique()
            .notNullable()
            .primary()
        tbl.float('weight')
        tbl.integer('weight_units')
            .references('id')
            .inTable('units')
        tbl.integer('distance_units')
            .references('id')
            .inTable('units')
        tbl.float('distance')
        tbl.integer('reps')
        tbl.bigint('created')
            .notNullable()
        tbl.bigint('updated')
            .notNullable()
    })

exports.down = (knex) =>
    knex.schema.dropTableIfExists('sets')
