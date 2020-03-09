/* eslint-disable no-undef */
// Core
import request from 'supertest';
import mongoose from 'mongoose';

// Server
import { app } from '../../../server';
import { Users, Auth, Todos } from '../../../controllers';
import { getTodo, getUser } from '../../../helpers';

const server = request.agent(app);

describe('todo read:', () => {
    let token = null;
    let uid = null;

    beforeEach(async (done) => {
        const user = getUser();
        const { id } = await new Users(user).create();
        uid = id;

        token = await new Auth({
            email:    user.email,
            password: user.password,
        }).login();

        done();
    });

    afterEach(async () => {
        await mongoose.connections[0].db.dropDatabase();
    });

    test('should return status 200 and empty array', async (done) => {
        const response = await server
            .get('/api/v2/todos')
            .set('X-Token', token)
            .expect(200);

        expect(response.body.data).toHaveLength(0);
        done();
    });

    test('should return status 200 and one item in array', async (done) => {
        await new Todos({ ...getTodo(), uid }).create();
        const response = await server
            .get('/api/v2/todos')
            .set('X-Token', token)
            .expect(200);

        expect(response.body.data).toHaveLength(1);
        done();
    });

    test('should return status 200 and object for read todo by id', async (done) => {
        const { id } = await new Todos({ ...getTodo(), uid }).create();
        const response = await server
            .get(`/api/v1/todos/${id}`)
            .set('X-Token', token)
            .expect(200);

        expect(typeof response.body.data).toBe('object');
        done();
    });
});
