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
    afterEach(async () => {
        await mongoose.connections[0].db.dropDatabase();
    });

    test('should return status 201 and create user', async (done) => {
        const user = getUser();
        const response = await server
            .post('/api/v1/users')
            .send(user)
            .expect(201);

        expect(response.body.data.email).toBe(user.email);
        done();
    });

    test('should return status 201 and password should not be present in the body', async (done) => {
        const user = getUser();
        const response = await server
            .post('/api/v1/users')
            .send(user)
            .expect(201);

        expect(response.body.data.password).toBeUndefined();
        done();
    });

    test('should return status 500 for duplicated user', async (done) => {
        const user = getUser();
        await new Users(user).create();

        await server
            .post('/api/v1/users')
            .send(user);
        await server
            .post('/api/v1/users')
            .send(user)
            .expect(500);

        done();
    });
});
