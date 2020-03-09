// Core
import express from 'express';

// Instruments
import { limiter, authenticate } from '../../helpers';

// Handlers
import * as todosV1 from './v1';
import * as todosV2 from './v2';

const route = express.Router();
const timeout = 1 * 60 * 1000; // 5 min

// V1
route.get('/v1/todos/:id', [limiter(10, timeout), authenticate], todosV1.getById);

// V2
route.get('/v2/todos', [limiter(10, timeout), authenticate], todosV2.get);
route.post('/v2/todos', [limiter(10, timeout), authenticate], todosV2.post);
route.put('/v2/todos/:id', [limiter(10, timeout), authenticate], todosV2.put);
route.delete('/v2/todos/:id', [limiter(10, timeout), authenticate], todosV2.remove);

export { route as todos };
