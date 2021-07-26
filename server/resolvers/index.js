const { books } = require('../mocks/books');
const { phoneResolvers } = require('../resolvers/phone');

const resolvers = {
    Query: {
        ...phoneResolvers.queries,
        books: () => books,
        getBookByTitle: (parent, args, context, info) =>
            books.find(book => book.title === args.title),
    },
};

module.exports = { resolvers };
