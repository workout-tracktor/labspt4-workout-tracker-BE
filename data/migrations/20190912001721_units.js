exports.up = (knex) =>
    knex.schema.createTable('units', tbl => {
        tbl.increments('id')
            .unique()
            .notNullable()
            .primary()
        tbl.text('name')
            .unique()
            .notNullable()
        tbl.bigint('created')
            .notNullable()
        tbl.bigint('updated')
            .notNullable()
    })

exports.down = (knex) =>
    knex.schema.dropTableIfExists('units')
