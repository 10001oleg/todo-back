// Core
import mongoose from 'mongoose';

// Document shape
const schema = new mongoose.Schema(
    {
        uid: {
            type:     mongoose.Schema.Types.ObjectId,
            ref:      'users',
            required: true,
            index:    true,
        },
        name: {
            type:     String,
            required: true,
        },
        description: {
            type:     String,
            required: true,
        },
        dd: {
            type:     Date,
            required: true,
        },
        status: {
            type:     String,
            required: true,
            index:    true,
            enum:     ['new', 'completed'],
            default:  'new',
            set(v) {
                return v.toLowerCase();
            },
        },
    },
    { timestamps: { createdAt: 'created', updatedAt: 'modified' } },
);

schema.index({ text: 'text' });

// Collection
export const todos = mongoose.model('todos', schema);
