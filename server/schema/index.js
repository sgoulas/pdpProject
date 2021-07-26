const { gql } = require('apollo-server');
const { PhoneTypeDefs: Phone } = require('./phone');

const typeDefs = gql`
    ${Phone}
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
    }
`;

module.exports = { typeDefs };
