exports.up = (knex) =>
    knex.schema.createTable('units', tbl => {
        tbl.increments('id')
            .unique()
            .notNullable()
            .primary()
        tbl.text('name')
            .unique()
            .notNullable()
        tbl.text('name_plural')
            .notNullable()
        tbl.text('abrv')
            .notNullable()
        tbl.text('system')
            .notNullable()
            .defaultTo('standard')
        tbl.text('purpose')
            .notNullable()
        tbl.timestamps(true, true)
    })

exports.down = (knex) =>
    knex.schema.dropTableIfExists('units')
