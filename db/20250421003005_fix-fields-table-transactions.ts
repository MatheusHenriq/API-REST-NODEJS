import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('transactions');
    await knex.schema.createTable('transactions', (table) => {
        table.uuid('id').primary();
        table.text('title').notNullable();
        table.decimal('amount', 10, 2).notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('transactions');

}

