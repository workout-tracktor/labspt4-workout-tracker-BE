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
        tbl.bigint('created_at')
            .notNullable()
        tbl.bigint('updated_at')
            .notNullable()
    })

exports.down = (knex) =>
    knex.schema.dropTableIfExists('units')
