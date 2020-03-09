// Core
import dg from 'debug';

// Instruments
import { Todos } from '../../../controllers';

const debug = dg('router:todos:v1');

export const getById = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const { id: todoId } = req.params;
        const data = { uid: req.user.id, todoId, ...req.body };
        const todos = new Todos(data);
        const todo = await todos.readById();

        res.status(200).json({ data: todo });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
