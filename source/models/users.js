// Instruments
import { users } from '../odm';

export class Users {
    constructor(data) {
        this.data = data;
        this.odm = users;
    }

    async read() {
        const { email: queryEmail } = this.data;
        const userData = await this.odm.findOne({ email: queryEmail }).lean();

        const { email, fname, lname } = userData;

        return { email, fname, lname };
    }

    async create() {
        const userData = await this.odm.create(this.data);

        const {
            _id: id, email, fname, lname,
        } = userData;

        return {
            id, email, fname, lname,
        };
    }
}
