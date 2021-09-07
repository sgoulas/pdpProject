const { gql } = require('apollo-server');

const {
    PHONE: { PhoneTypeDefs },
    TABLET: { TabletTypeDefs },
} = require('./products');

const typeDefs = gql`
    ${PhoneTypeDefs}
    ${TabletTypeDefs}

    "The object that defines all the queries"
    type Query {
        "Returns information about the server"
        info: String
    }
`;

module.exports = { typeDefs };
