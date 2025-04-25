import knex, { Knex } from 'knex';
import { env } from './env';



export const config: Knex.Config = { //pra herdar todas as configuraçãos do knex
    client: 'sqlite3',
    connection: {
        filename: env.DATABASE_URL,
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db'
    }
};

export const setupKnex = knex(config);