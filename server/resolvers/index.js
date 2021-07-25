const { books } = require('../mocks/books');

const resolvers = {
    Query: {
        books: () => books,
        getBookByTitle: (parent, args, context, info) =>
            books.find(book => book.title === args.title),
    },
};

module.exports = { resolvers };
