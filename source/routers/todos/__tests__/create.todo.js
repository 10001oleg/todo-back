/* eslint-disable no-undef */
// Core
import request from 'supertest';
import mongoose from 'mongoose';

// Server
import { app } from '../../../server';
import { Users, Auth } from '../../../controllers';
import { getTodo, getUser } from '../../../helpers';

const server = request.agent(app);

describe('todo create:', () => {
    let token = null;

    beforeEach(async (done) => {
        const user = getUser();
        await new Users(user).create();

        token = await new Auth({
            email:    user.email,
            password: user.password,
        }).login();

        done();
    });

    afterEach(async () => {
        await mongoose.connections[0].db.dropDatabase();
    });

    test('should return status 201 and create todo', async (done) => {
        const response = await server
            .post('/api/v2/todos')
            .set('X-Token', token)
            .send(getTodo())
            .expect(201);

        expect(typeof response.body.data).toBe('object');
        done();
    });

    test('should return status 401 if login token incorrect', async (done) => {
        await server
            .post('/api/v2/todos')
            .set('X-Token', 'some.incorrect.token')
            .send(getTodo())
            .expect(401);

        done();
    });
});
