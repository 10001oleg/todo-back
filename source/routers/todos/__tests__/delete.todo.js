/* eslint-disable no-undef */
// Core
import request from 'supertest';
import mongoose from 'mongoose';

// Server
import { app } from '../../../server';
import { Users, Auth, Todos } from '../../../controllers';
import { getTodo, getUser } from '../../../helpers';

const server = request.agent(app);

describe('todo delete:', () => {
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

    test('should return status 204', async (done) => {
        const { id } = await new Todos({ ...getTodo(), uid }).create();

        await server
            .delete(`/api/v2/todos/${id}`)
            .set('X-Token', token)
            .expect(204);

        done();
    });
});
