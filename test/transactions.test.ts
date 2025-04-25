import { test, beforeAll, afterAll, describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest'; //auxilia nas requisições https
import { app } from '../src/app';
import { execSync } from 'node:child_process'; //da margem pra executar um proecesso, como os que sao executados via bash
import { string } from 'zod';

describe('Transactions Routes', () => {
    beforeAll(async () => {
        await app.ready(); //ela verifica que está tudo carregado, no caso os plugins, pra dai partir pros testes
    });

    afterAll(async () => {
        await app.close();
    });

    beforeEach(() => { execSync('npm run knex migrate:rollback --all'); execSync('npm run knex migrate:latest'); });

    it('User can create a new transaction', async () => {
        const response = await request(app.server).post('/transactions').send({
            title: 'New transaction',
            amount: 5000,
            type: 'credit',
        }).expect(201);
    });

    it('Should be able to list all transctions', async () => {
        const createTransctionResponse = await request(app.server).post('/transactions').send({
            title: 'New transaction',
            amount: 5000,
            type: 'credit',
        });
        const cookies = createTransctionResponse.get('Set-Cookie');
        const listTransactionResponse = await request(app.server).get('/transactions').set('Cookie', cookies as string[]).expect(200);
        expect(listTransactionResponse.body.transactions).toEqual([
            expect.objectContaining({
                title: 'New transaction',
                amount: 5000,
                type: 'credit',
            })
        ]);
    });

    it('Should be able to get a specific transaction', async () => {
        const createTransctionResponse = await request(app.server).post('/transactions').send({
            title: 'New transaction',
            amount: 5000,
            type: 'credit',
        });
        const cookies = createTransctionResponse.get('Set-Cookie');
        const listTransactionResponse = await request(app.server).get('/transactions')
            .set('Cookie', cookies as string[]).expect(200);

        const transactionId = listTransactionResponse.body.transactions[0].id;

        const getTransactionResponse = await request(app.server).get(`/transactions/${transactionId}`)
            .set('Cookie', cookies as string[]).expect(200);
        expect(getTransactionResponse.body.transactions).toEqual(expect.objectContaining({
            title: 'New transaction',
            amount: 5000,
            type: 'credit',
        },),);
    });
    it('Should be able to get a the summary', async () => {

        const createTransctionResponse = await request(app.server).post('/transactions').send({
            title: 'New transaction',
            amount: 5000,
            type: 'credit',
        });
        const cookies = createTransctionResponse.get('Set-Cookie');

        await request(app.server).post('/transactions').set('Cookie', cookies as string[]).send({
            title: 'Debit transaction',
            amount: 2000,
            type: 'debit',
        });

        const summaryResponse = await request(app.server).get('/transactions/summary')
            .set('Cookie', cookies as string[]).expect(200);

        expect(summaryResponse.body.summary).toEqual({ amount: 3000 });
    });
});

