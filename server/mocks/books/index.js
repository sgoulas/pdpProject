const faker = require('faker');

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
    {
        title: `${faker.lorem.sentence(4)}`,
        author: `${faker.name.firstName()} ${faker.name.lastName()}`,
    },
];

module.exports = { books };
