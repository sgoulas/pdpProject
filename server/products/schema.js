const { gql } = require('apollo-server');

const ProductTypeDef = gql`
    union Product = Phone | Tablet

    extend type Query {
        "Returns all products"
        products: [Product]
    }
`;

module.exports = {
    ProductTypeDef,
};
