import { FastifyInstance } from 'fastify';
import { setupKnex } from '../database';
import z from 'zod';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

export async function transactionsRoutes(app: FastifyInstance) {

    //pre-handler == middleware
    app.addHook('preHandler', async (req, res) => {
        console.log(`[${req.method}] ${req.url}`);
    });


    app.post('/', async (req, res) => {
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit']),
        });

        const { title, amount, type } = createTransactionBodySchema.parse(req.body);
        const uuid = crypto.randomUUID();
        let sessionId = req.cookies.sessionId;
        if (!sessionId) {
            sessionId = crypto.randomUUID();
            res.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7, //7 days
            });
        }
        const transactions = await setupKnex('transactions').insert({
            id: uuid,
            title: title,
            amount: type === 'credit' ? amount : amount * -1,
            type: type,
            session_id: sessionId
        }).returning('*').where('id', uuid);

        return res.status(201).send(transactions);

    });


    app.get('/', { preHandler: [checkSessionIdExists] }, async (req, res) => {
        const sessionId = req.cookies.sessionId;

        const transactions = await setupKnex('transactions').select().where('session_id', sessionId);

        return { transactions, total: transactions.length };
    });

    app.get('/:id', { preHandler: [checkSessionIdExists] }, async (req, res) => {
        const sessionId = req.cookies.sessionId;

        const getTransactionsParamsSchema = z.object({
            id: z.string().uuid(),
        });
        const { id } = getTransactionsParamsSchema.parse(req.params);
        const transactions = await setupKnex('transactions').select().where({ 'id': id, 'session_id': sessionId }).first();

        return { transactions };
    });

    app.get('/summary', { preHandler: [checkSessionIdExists] }, async (req, res) => {
        const sessionId = req.cookies.sessionId;

        const summary = await setupKnex('transactions').where('session_id', sessionId).sum('amount', { as: 'amount' }).first();
        return { summary };
    });
}   