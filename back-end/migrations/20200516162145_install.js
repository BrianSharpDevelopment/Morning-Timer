const knex = require('knex');
const tableNames = require('./../src/constants/table_names');

exports.up = async (knex) => {
    await knex.schema.createTable(tableNames.user, (table) => {
        table.increments().notNullable(); //Create ID Column
        table.string("email", 254).notNullable(); 
        table.text("first_name").notNullable();
        table.text("last_name").notNullable();
        table.text("password", 500).notNullable();
        table.datetime("last_login", {useTz: true});
        table.timestamp("created_at", {useTz: true}).notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at", {useTz: true}).notNullable().defaultTo(knex.fn.now());
        table.timestamp("deleted_at", {useTz: true});
    })

    await knex.schema.createTable(tableNames.routine, (table) => {
        table.increments().notNullable();
        table.integer("user_id").notNullable();
        table.date("scheduled_date").notNullable();
        table.boolean("complete").notNullable().default(false);
        table.timestamp("created_at", {useTz: true}).notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at", {useTz: true}).notNullable().defaultTo(knex.fn.now());
        table.timestamp("deleted_at", {useTz: true});
    }) 
    
    await knex.schema.createTable(tableNames.task, (table) => {
        table.increments().notNullable();
        table.integer("routine_id").notNullable();
        table.integer("total_time_sec").notNullable();
        table.integer("completed_time_sec").notNullable().default(0);;
        table.boolean("completed").notNullable().default(false);
        table.timestamp("created_at", {useTz: true}).notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at", {useTz: true}).notNullable().defaultTo(knex.fn.now());
        table.timestamp("deleted_at", {useTz: true});
    })
};


exports.down = async (knex) => {
    await knex.schema.dropTable(tableNames.user);
    await knex.schema.dropTable(tableNames.routine);
    await knex.schema.dropTable(tableNames.task);
};