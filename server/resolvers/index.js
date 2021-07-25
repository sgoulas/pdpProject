const { books } = require('../mocks/books');

const resolvers = {
    Query: {
        books: () => books,
    },
};

module.exports = { resolvers };
