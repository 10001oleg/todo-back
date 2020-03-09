/* eslint-disable no-undef */
import { getPort } from '../getPort';

describe('get port:', () => {
    let port = 0;

    beforeAll(() => {
        port = process.env.PORT;
    });

    afterEach(() => {
        process.env.PORT = port;
    });

    test('should return default status code', () => {
        process.env.PORT = 3000;
        expect(getPort()).toBe(3000);
    });

    test('should throw error if port does not exists in env', () => {
        delete process.env.PORT;
        expect(() => getPort()).toThrow();
    });

    test('should throw error if port grater than 9999', () => {
        process.env.PORT = 10000;
        expect(() => getPort()).toThrow();
    });
});
