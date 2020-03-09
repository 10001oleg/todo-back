/* eslint-disable no-undef */
import { ValidationError } from '../validationError';

describe('validation error:', () => {
    test('should return default status code', () => {
        expect(new ValidationError().statusCode).toBe(400);
    });
});
