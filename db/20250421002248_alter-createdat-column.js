"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.alterTable('transactions', (table) => {
        table.timestamp('created_at').alter().defaultTo(knex.fn.now());
    });
}
async function down(knex) {
    await knex.schema.alterTable('transactions', (table) => {
        table.timestamp('created_at').alter().defaultTo(knex.fn.now()).notNullable;
    });
}
