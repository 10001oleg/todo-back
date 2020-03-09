// Core
import dg from 'debug';

// Instruments
import { Users } from '../../controllers';

const debug = dg('router:users');

export const get = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const user = new Users(req.user);
        const data = await user.read();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const user = new Users(req.body);
        const data = await user.create();

        res.status(201).json({ data });
    } catch ({ name, message }) {
        if (name === 'ValidationError') {
            res.status(500).json({
                message,
            });
        } else {
            res.status(400).json({ message });
        }
    }
};
