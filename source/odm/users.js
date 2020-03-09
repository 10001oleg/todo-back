// Core
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import uniqueValidator from 'mongoose-unique-validator';

// Document shape
const schema = new mongoose.Schema({
    fname: {
        type:     String,
        required: true,
    },
    lname: {
        type:     String,
        required: true,
    },
    email: {
        type:     String,
        required: true,
        unique:   true,
        index:    true,
    },
    password: {
        type:     String,
        required: true,
        set(v) {
            return bcrypt.hashSync(v, 11);
        },
    },
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' } });

schema.plugin(uniqueValidator);

// Collection
export const users = mongoose.model('users', schema);
