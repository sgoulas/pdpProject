const { gql } = require('apollo-server');
const { typeDefs: phone } = require('./phone');

const typeDefs = gql`
    ${phone}
    "Book description"
    type Book {
        title: String
        author: String
    }

    "The object that defines all the queries"
    type Query {
        "Returns all books"
        books: [Book]
        "Returns the book whose title matches the given param"
        getBookByTitle(title: String!): Book
        "Returns all phones"
        phones: [Phone]
    }
`;

module.exports = { typeDefs };
