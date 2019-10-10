exports.up = (knex) =>
    knex.schema.createTable('exercises', tbl => {
        tbl.increments('id')
            .unique()
            .notNullable()
            .primary()
        tbl.text('name')
            .unique()
            .notNullable()
        tbl.integer('equipment_id')
            .references('id')
            .inTable('equipments')
        tbl.text('description')
        tbl.bigint('created')
            .notNullable()
        tbl.bigint('updated')
            .notNullable()
    })

exports.down = (knex) =>
    knex.schema.dropTableIfExists('exercises')