// Core
import express from 'express';

// Instruments
import { limiter } from '../../helpers';

// Handlers
import * as authenticate from './handlers';

const route = express.Router();
const timeout = 1 * 60 * 1000; // 5 min

route.post('/v1/auth/login', [limiter(10, timeout)], authenticate.login);

export { route as auth };
