/* eslint-disable no-undef */
// Core
import request from 'supertest';
import mongoose from 'mongoose';

// Server
import { app } from '../../../server';
import { Users } from '../../../controllers';
import { getUser } from '../../../helpers';

const server = request.agent(app);

describe('user create:', () => {
    let email = '';
    let password = '';

    beforeEach(async (done) => {
        const user = getUser();
        await new Users(user).create();

        ({ email, password } = user);

        done();
    });

    afterEach(async () => {
        await mongoose.connections[0].db.dropDatabase();
    });

    test('should return status 204 and login user', async (done) => {
        const base64 = Buffer.from(`${email}:${password}`).toString('base64');

        const response = await server
            .post('/api/v1/auth/login')
            .set('Authorization', `Basic ${base64}`)
            .expect(200);

        expect(typeof response.body.data).toBe('string');
        done();
    });

    test('should return status 401 if auth type not basic', async (done) => {
        const base64 = Buffer.from(`${email}:${password}`).toString('base64');

        await server
            .post('/api/v1/auth/login')
            .set('Authorization', `Bearer ${base64}`)
            .expect(401);

        done();
    });

    test('should return status 401 if user does not exists', async (done) => {
        const base64 = Buffer.from(`jdoe@email.com:${password}`).toString('base64');

        await server
            .post('/api/v1/auth/login')
            .set('Authorization', `Basic ${base64}`)
            .expect(401);

        done();
    });
});
