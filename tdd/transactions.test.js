const request = require('supertest');
const app = require('../app');

// Test => GET : Retrived all transaction for activity //
describe('GET /:activityId', () => {
    // 1 - Return 400 if activityId is invalid
    it('1 - Test activityId is invalid', async () => {
        const res = await request(app).get('/transactions/invalidId'); // "invalidId" isn't a valid _id
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error', 'Invalid activity Id');
    });

    // 2 - Return 404 if no transactions are found
    it('2 - Test no transactions are found', async () => {
        const validId = '000000000000000000000000'; // Juste 24 charactères like _id
        const res = await request(app).get(`/transactions/${validId}`);
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error', 'Transaction not found');
    });

    // 3 - Return 200 and the list of transactions if transactions are found
    it('3 - Test transactions are found', async () => {
        const validActivityId = '66bb6b6e425d42873c3dbec0'; // ValidActivity _id take from DB

        const res = await request(app).get(`/transactions/${validActivityId}`);
        // Tests Global from response
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        // Tests Transaction infos
        expect(res.body[0]).toHaveProperty('_id');
        expect(res.body[0]).toHaveProperty('amount');
        expect(res.body[0]).toHaveProperty('date');
        expect(res.body[0]).toHaveProperty('user');
        expect(res.body[0]).toHaveProperty('activity');
        // Tests User infos
        expect(res.body[0].user).toHaveProperty('token');
        expect(res.body[0].user).toHaveProperty('username');
        expect(res.body[0].user).not.toHaveProperty('_id');
        expect(res.body[0].user).not.toHaveProperty('password');
        // Tests Activity infos
        expect(res.body[0].activity).toHaveProperty('_id');
        expect(res.body[0].activity).toHaveProperty('name');
        expect(res.body[0].activity).toHaveProperty('payementLimit');
        expect(res.body[0].activity).toHaveProperty('payementClose');
    });
});