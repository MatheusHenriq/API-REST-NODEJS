import knex, { Knex } from 'knex';
import { env } from './env';



export const config: Knex.Config = { //pra herdar todas as configuraçãos do knex
    client: env.DATABASE_CLIENT,
    connection: env.DATABASE_CLIENT === 'sqlite' ? {
        filename: env.DATABASE_URL,
    } : env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db'
    }
};

export const setupKnex = knex(config);