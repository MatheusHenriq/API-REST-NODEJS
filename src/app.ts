import fastify from 'fastify';
import { transactionsRoutes } from './routes/transactions';
import cookie from '@fastify/cookie';
import dotenv from 'dotenv';

export const app = fastify();
app.register(cookie);
app.register(transactionsRoutes, { prefix: 'transactions', });

