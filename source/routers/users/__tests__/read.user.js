/* eslint-disable no-undef */
// Core
import request from 'supertest';
import mongoose from 'mongoose';

// Server
import { app } from '../../../server';
import { Users, Auth } from '../../../controllers';
import { getUser } from '../../../helpers';

const server = request.agent(app);

describe('user read:', () => {
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

    test('should return status 200 and user profile', async (done) => {
        const response = await server
            .get('/api/v1/users/profile')
            .set('X-Token', token)
            .expect(200);

        expect(typeof response.body.data).toBe('object');
        done();
    });
});
