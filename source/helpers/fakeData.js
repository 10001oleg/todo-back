/* eslint-disable import/no-extraneous-dependencies */
import faker from 'faker';

export const getUser = () => ({
    fname:    faker.name.firstName(),
    lname:    faker.name.lastName(),
    password: faker.internet.password(),
    email:    faker.internet.email(),
});

export const getTodo = () => ({
    name:        faker.lorem.word(),
    description: faker.lorem.paragraph(),
    dd:          faker.date.past(),
});
