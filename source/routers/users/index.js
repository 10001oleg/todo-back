// Core
import express from 'express';

// Instruments
import { limiter, authenticate } from '../../helpers';

// Handlers
import * as users from './handlers';

const route = express.Router();
const timeout = 1 * 60 * 1000; // 5 min

route.get('/v1/users/profile', [limiter(10, timeout), authenticate], users.get);
route.post('/v1/users', [limiter(10, timeout)], users.post);

export { route as users };
