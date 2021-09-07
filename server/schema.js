const { gql } = require('apollo-server');

const {
    PHONE: { PhoneTypeDefs },
    TABLET: { TabletTypeDefs },
} = require('./products');

const typeDefs = gql`
    ${PhoneTypeDefs}
    ${TabletTypeDefs}

    union Product = Phone | Tablet

    "The object that defines all the queries"
    type Query {
        "Returns information about the server"
        info: String
        "Returns all products"
        products: [Product]
    }
`;

module.exports = { typeDefs };
