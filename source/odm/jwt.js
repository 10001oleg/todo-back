// Core
import mongoose from 'mongoose';

// Document shape
const schema = new mongoose.Schema(
    {
        token: {
            type:     String,
            required: true,
        },
        key: {
            type:     String,
            required: true,
        },
    },
    { timestamps: { createdAt: 'created', updatedAt: false } },
);

schema.index({ created: 1 }, { expireAfterSeconds: 3600 });

// Collection
export const jwt = mongoose.model('jwt', schema);
