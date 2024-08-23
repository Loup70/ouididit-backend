const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('GET /:activityId', () => {
    it('should return 400 if activityId is invalid', async () => {
        const res = await request(app).get('/transactions/invalidId'); // not a _id
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error', 'Invalid activity Id');
    });

    it('should return 404 if no transactions are found', async () => {
        const validId = '000000000000000000000000'; // Juste 24 charactères like _id
        const res = await request(app).get(`/transactions/${validId}`);
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error', 'Transaction not found');
    });

    it('should return 200 and the list of transactions if transactions are found', async () => {
        const validActivityId = '66bb6b6e425d42873c3dbec0'; // _id found in DB

        const res = await request(app).get(`/transactions/${validActivityId}`);
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('_id');
        expect(res.body[0]).toHaveProperty('amount');
        expect(res.body[0]).toHaveProperty('date');
        expect(res.body[0]).toHaveProperty('user');
        expect(res.body[0].user).toHaveProperty('token');
        expect(res.body[0].user).toHaveProperty('username');
        expect(res.body[0].user).not.toHaveProperty('_id');
        expect(res.body[0].user).not.toHaveProperty('password');
        expect(res.body[0]).toHaveProperty('activity');
        expect(res.body[0].activity).toHaveProperty('_id');
        expect(res.body[0].activity).toHaveProperty('name');
        expect(res.body[0].activity).toHaveProperty('payementLimit');
        expect(res.body[0].activity).toHaveProperty('payementClose');
    });
});