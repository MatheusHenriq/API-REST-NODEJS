import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('transactions', (table) => {
        table.dropColumn('session_id');
    });
}


export async function down(knex: Knex): Promise<void> {
}

