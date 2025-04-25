"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.dropTableIfExists('transactions');
}
async function down(knex) {
    await knex.schema.dropTableIfExists('transactions');
}
