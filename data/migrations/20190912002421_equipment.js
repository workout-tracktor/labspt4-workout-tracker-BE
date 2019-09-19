exports.up = (knex) =>
    knex.schema.createTable('equipments', tbl => {
        tbl.increments('id')
            .primary()
            .unique()
            .notNullable()
        tbl.text('equipment_id')
            .unique()
            .notNullable()
        tbl.text('name')
            .unique()
            .notNullable()
        tbl.text('description')
    })

exports.down = (knex) =>
    knex.schema.dropTableIfExists('equipments')
