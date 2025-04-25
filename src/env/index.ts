
import { config } from 'dotenv';
import z from 'zod';

if (process.env.NODE_ENV === 'TEST') {
    config({ path: '.env.test' });
} else {
    config();
}

const envSchema = z.object({
    DATABASE_URL: z.string(),
    PORT: z.coerce.number().default(3333), //coerce faz a conversão do que vier pra number
    DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
    NODE_ENV: z.enum(['dev', 'stg', 'prd', 'test']).default('prd')
});

const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
    console.error('💣Invalid enviroment variables!', _env.error.format());
    throw new Error('Invalid enviroment variables!');
}
export const env = _env.data;