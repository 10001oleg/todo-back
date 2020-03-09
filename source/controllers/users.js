import { Users as UsersModel } from '../models';

export class Users {
    constructor(data) {
        this.models = {
            users: new UsersModel(data),
        };
    }

    async read() {
        const { users } = this.models;
        const data = await users.read();

        return data;
    }

    async create() {
        const { users } = this.models;
        const data = await users.create();

        return data;
    }
}
