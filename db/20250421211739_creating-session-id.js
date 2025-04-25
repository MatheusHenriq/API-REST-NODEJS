"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.alterTable('transactions', (table) => {
        table.uuid('session_id').after('id').index(); // ele cria um index automaticamente, e isso fala pra o banco de dados que esse campo
        // vai ser muito usado no where, e faz com que ele crie um cache, o que torna esse processo mais rápido
    });
}
async function down(knex) {
    await knex.schema.alterTable('transactions', (table) => {
        table.dropColumn('session_id');
    });
}
