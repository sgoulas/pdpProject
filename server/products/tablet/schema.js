const { gql } = require('apollo-server');

const TabletTypeDefs = gql`
    "Details the Phone properties"
    type Tablet {
        "The id corresponding to the product"
        id: String

        "The stock keeping unit identifier to differentiate between similar products based on their different attribute values"
        sku: String

        "Tablet brand"
        brand: String

        "The aggregated rating of the sku"
        ratingValue: Float

        "The number of ratings"
        reviewCount: Int

        "The price of the sku"
        price: Float

        "Stock availability of the sku"
        availability: Int

        "The product page url for the sku"
        url: String

        "Product description"
        description: String

        "Image url"
        image: String

        "Product name"
        name: String

        "Tablet only prop"
        tabletProp: String
    }

    extend type Query {
        "Returns all tablets"
        tablets: [Tablet]
        "Returns the Tablet whose id matches the provided one or undefined if none is found"
        getTabletById(id: String!): Tablet
    }
`;

module.exports = { TabletTypeDefs };
