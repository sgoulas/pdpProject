const { gql } = require('apollo-server');

const {
    PHONE: { PhoneTypeDefs },
    TABLET: { TabletTypeDefs },
    PRODUCT: { ProductTypeDef },
} = require('./products');

const typeDefs = gql`
    ${PhoneTypeDefs}
    ${TabletTypeDefs}
    ${ProductTypeDef}

    "The object that defines all the queries"
    type Query {
        "Returns information about the server"
        info: String
    }
`;

module.exports = { typeDefs };
