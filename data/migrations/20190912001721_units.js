exports.up = (knex) =>
    knex.schema.createTable('units', tbl => {
        tbl.increments('id')
            .unique()
            .notNullable()
            .primary()
        tbl.text('unit_id')
            .unique()
            .notNullable()
        tbl.text('name')
            .unique()
            .notNullable()
    })

exports.down = (knex) =>
    knex.schema.dropTableIfExists('units')
