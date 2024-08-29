const request = require('supertest');
const app = require('../app');

const validUserToken = "vzQdbt8syucsBbkl-nl-By_p4Zi7SMtL"; // token take from DB, user : xavier@gmail.com
const validChatId = "66bd30f8eec9924dec706f48"; // ValidChatId _id take from DB

// Test => GET : Count new messages //
describe('GET /:chatId/:userToken', () => {
    // 1 - Return 400 if chatId is invalid
    it('1 - Test chatId is invalid', async () => {
        const res = await request(app).get(`/chats/invalidId/${validUserToken}`); // "invalidId" isn't a valid _id
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ result: false, error: 'Invalid chat Id'});
    });

    // 2 - Return 400 if userToken is invalid
    it('2 - Test userToken is invalid', async () => {
        const res = await request(app).get(`/chats/${validChatId}/invalidToken`); // "invalidId" isn't a valid _id
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ result: false, error: 'Invalid user token' });
    });

    // 3 - Return result false and count === 0 if no chat found
    it('3 - Test no chat found', async () => {
        const validId = '000000000000000000000000'; // Juste 24 charactères like _id
        const res = await request(app).get(`/chats/${validId}/${validUserToken}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ result: false, newMessagesCount: 0 });
    });
    
    // 4 - Return relust true and newMessagesCount >=0 if chat found
    it('4 - Test chat founded', async () => {
        const res = await request(app).get(`/chats/${validChatId}/${validUserToken}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty( 'result', true );
        expect(typeof res.body.newMessagesCount).toBe('number');
        expect(res.body.newMessagesCount).toBeGreaterThanOrEqual(0);
    });
});