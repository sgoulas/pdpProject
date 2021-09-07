const { gql } = require('apollo-server');

const ProductTypeDef = gql`
    union Product = Phone | Tablet

    extend type Query {
        "Returns all products"
        allProducts: [Product]

        "Returns products that include the input name in their name"
        products(name: String!): [Product]

        "Returns product with matching id"
        product(id: String!): Product
    }
`;

module.exports = {
    ProductTypeDef,
};
