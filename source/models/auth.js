// Core
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import pem from 'pem';
import { v4 } from 'uuid';
import { promisify } from 'util';

// Instruments
import { users, jwt } from '../odm';
import { NotFoundError } from '../helpers';

export class Auth {
    constructor(data) {
        this.data = data;
        this.odm = users;
        this.createPrivateKey = promisify(pem.createPrivateKey);
    }

    async login() {
        const { email, password } = this.data;
        const userData = await this.odm
            .findOne({ email })
            .select('password hash email fname lname')
            .lean();

        if (!userData) {
            throw new NotFoundError('credentials are not valid');
        }

        const {
            _id: id,
            password: userPassword,
            email: userEmail,
            fname,
            lname,
        } = userData;

        const match = await bcrypt.compare(password, userPassword);

        if (!match) {
            throw new NotFoundError('credentials are not valid');
        }

        const { key } = await this.createPrivateKey(2048, {
            password: v4(),
        });

        const token = jsonwebtoken.sign(
            {
                id, email: userEmail, fname, lname,
            },
            key,
            { expiresIn: '1h' },
        );

        await jwt.create({ token, key });

        return token;
    }
}
