import { Auth as AuthModel } from '../models';

export class Auth {
    constructor(data) {
        this.models = {
            auth: new AuthModel(data),
        };
    }

    async login() {
        const { auth } = this.models;
        const data = await auth.login();

        return data;
    }
}
