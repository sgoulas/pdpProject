const { gql } = require('apollo-server');

/**
 * in the future when the actual implementation takes place
 * we should define multiple subfolders for each entity
 * and import their sub-schemas (types, resolvers) from there
 * and stitch them all together here and then export the typeDefs
 */

const temp = gql`
    type Person {
        name: String
        lastName: String
    }
`;

const typeDefs = gql`
    ${temp}
    "Book description"
    type Book {
        title: String
        author: String
    }

    "The object that defines all the queries"
    type Query {
        "Returns all the books"
        books: [Book]
        "Returns the book whose title matches the given param"
        getBookByTitle(title: String!): Book
    }
`;

module.exports = { typeDefs };
