// Instruments
import { todos } from '../odm';

export class Todos {
    constructor(data) {
        this.data = data;
        this.odm = todos;
    }

    async read() {
        const { id: uid } = this.data;
        const source = await this.odm
            .find({ uid })
            .sort('-created')
            .select('-__v -modified -uid')
            .lean();

        const result = source.map(
            ({
                _id: id, status, name, description, dd, created,
            }) => ({
                id,
                status,
                name,
                description,
                dd,
                created,
            }),
        );

        return result;
    }

    async readById() {
        const { uid, todoId } = this.data;
        const source = await this.odm
            .findOne({ _id: todoId, uid })
            .select('-__v -modified')
            .lean();

        if (!source) {
            throw new Error('todo not found');
        }

        const {
            _id: id, status, name, description, dd, created,
        } = source;

        return {
            id, status, name, description, dd, created,
        };
    }

    async create() {
        const source = await this.odm.create(this.data);

        const {
            _id: id, status, name, description, dd, created,
        } = source;

        return {
            id, status, name, description, dd, created,
        };
    }

    async update() {
        const { uid, todoId } = this.data;
        const query = Todos.formatUpdateQuery(this.data);

        const source = await this.odm.findOneAndUpdate(
            { _id: todoId, uid },
            query,
        );

        if (!source) {
            throw new Error('todo not found');
        }

        return true;
    }

    async remove() {
        const { uid, todoId } = this.data;

        const source = await this.odm.findOneAndRemove({ _id: todoId, uid });

        if (!source) {
            throw new Error('todo not found');
        }

        return true;
    }

    static formatUpdateQuery(data) {
        const query = {};
        const {
            name, description, status, dd,
        } = data;

        if (name) {
            query.name = name;
        }

        if (description) {
            query.description = description;
        }

        if (status) {
            query.status = status;
        }

        if (dd) {
            query.dd = dd;
        }

        return query;
    }
}
