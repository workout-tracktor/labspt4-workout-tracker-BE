exports.up = (knex) =>
    knex.schema.createTable('equipments', tbl => {
        tbl.increments('id')
            .primary()
            .unique()
            .notNullable()
        tbl.text('name')
            .unique()
            .notNullable()
        tbl.text('description')
        tbl.bigint('created')
            .notNullable()
        tbl.bigint('updated')
            .notNullable()
    })

exports.down = (knex) =>
    knex.schema.dropTableIfExists('equipments')
