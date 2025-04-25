import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('transactions', (table) => {
        table.uuid('session_id').index(); // ele cria um index automaticamente, e isso fala pra o banco de dados que esse campo
        // vai ser muito usado no where, e faz com que ele crie um cache, o que torna esse processo mais rápido
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('transactions', (table) => {
        table.dropColumn('session_id');
    });
}
