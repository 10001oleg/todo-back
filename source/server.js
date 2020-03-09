// Core
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dg from 'debug';

// Instruments
import { NotFoundError } from './helpers';

// Initialize DB connection
import './db';

// Routes
import { auth, users, todos } from './routers';

const app = express();
const debug = dg('server:init');

app.use(helmet());
app.use((req, res, next) => {
    const origin = req.headers.origin || 'http://localhost:3000';

    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Methods',
        'GET, PUT, POST, DELETE, OPTIONS',
    );
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, Authentication, Content-Length, X-Requested-With, Cache, X-Token',
    );

    if (req.method === 'OPTIONS') {
        res.sendStatus(204);
    } else {
        next();
    }
});

app.use(
    bodyParser.json({
        limit: '5kb',
    }),
);

app.use('/api', [auth, users, todos]);

app.use('*', (req, res, next) => {
    const error = new NotFoundError(
        `Can not find right route for method ${req.method} and path ${req.originalUrl}`,
        404,
    );
    next(error);
});

if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-unused-vars
    app.use((error, req, res, next) => {
        const { name, message, statusCode } = error;
        const errorMessage = `${name}: ${message}`;

        debug(`Error: ${errorMessage}`);

        const status = statusCode || 500;
        res.status(status).json({ message });
    });
}

export { app };
