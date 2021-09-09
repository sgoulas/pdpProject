const { gql } = require('apollo-server');

const ProductTypeDef = gql`
    union Product = Phone | Tablet

    extend type Query {
        "Returns all products"
        allProducts: [Product]

        "Returns products that include the input name in their name"
        getProductsByName(name: String!): [Product]

        "Returns product with matching id"
        getProductById(id: String!): Product
    }
`;

module.exports = {
    ProductTypeDef,
};
