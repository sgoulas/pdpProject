const { gql } = require('apollo-server');

const ProductTypeDef = gql`
    union Product = Phone | Tablet

    extend type Query {
        "Returns all products"
        products: [Product]

        "Returns products that include the input name in their name"
        getProductByName(name: String!): [Product]

        "Returns product with matching id"
        getProductByID(id: String!): Product
    }
`;

module.exports = {
    ProductTypeDef,
};
