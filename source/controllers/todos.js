import { Todos as TodosModel } from '../models';

export class Todos {
    constructor(data) {
        this.models = {
            todos: new TodosModel(data),
        };
    }

    async read() {
        const { todos } = this.models;
        const data = await todos.read();

        return data;
    }

    async readById() {
        const { todos } = this.models;
        const data = await todos.readById();

        return data;
    }

    async create() {
        const { todos } = this.models;
        const data = await todos.create();

        return data;
    }

    async update() {
        const { todos } = this.models;
        const data = await todos.update();

        return data;
    }

    async remove() {
        const { todos } = this.models;
        const data = await todos.remove();

        return data;
    }
}
