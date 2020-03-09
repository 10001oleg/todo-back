/* eslint-disable no-undef */
import { NotFoundError } from '../notFoundError';

describe('not found error:', () => {
    test('should return default status code', () => {
        expect(new NotFoundError().statusCode).toBe(404);
    });

    test('should throw error if second argument not a number', () => {
        expect(() => new NotFoundError('error', '404').statusCode).toThrow();
    });
});
