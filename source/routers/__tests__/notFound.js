/* eslint-disable no-undef */
// Core
import request from 'supertest';

// Server
import { app } from '../../server';

const server = request.agent(app);

describe('not found endpoint:', () => {
    test('should return status 404', async (done) => {
        await server.get('/api/not-found').expect(404);

        done();
    });
});
