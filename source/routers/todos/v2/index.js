// Core
import dg from 'debug';

// Instruments
import { Todos } from '../../../controllers';

const debug = dg('router:todos:v2');

export const get = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const todos = new Todos(req.user);
        const data = await todos.read();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const data = { ...req.body, uid: req.user.id };
        const todos = new Todos(data);
        const todo = await todos.create();

        res.status(201).json({ data: todo });
    } catch ({ name, message }) {
        res.status(400).json({ message });
    }
};

export const put = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const { id: todoId } = req.params;
        const data = { uid: req.user.id, todoId, ...req.body };
        const todos = new Todos(data);
        await todos.update();

        res.sendStatus(204);
    } catch ({ name, message }) {
        res.status(400).json({ message });
    }
};

export const remove = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const { id: todoId } = req.params;
        const data = { uid: req.user.id, todoId };
        const todos = new Todos(data);
        await todos.remove();

        res.sendStatus(204);
    } catch ({ name, message }) {
        res.status(400).json({ message });
    }
};
