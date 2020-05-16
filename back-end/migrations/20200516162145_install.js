const knex = require('knex');
const tableNames = require('./../src/constants/table_names');

exports.up = async (knex) => {
    await knex.schema.createTable(tableNames.user, (table) => {
        table.increments().notNullable(); //Create ID Column
        table.string("email", 254).notNullable().unique(); 
        table.text("name").notNullable();
        table.text("password", 500).notNullable();
        table.datetime("last_login", {useTz: true});
        table.timestamp("created_at", {useTz: true}).notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at", {useTz: true}).notNullable().defaultTo(knex.fn.now());
        table.timestamp("deleted_at", {useTz: true});
    })

    
};


exports.down = async (knex) => {

    await knex.schema.dropTable(tableNames.user);
};