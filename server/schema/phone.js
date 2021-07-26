const { gql } = require('apollo-server');

const PhoneTypeDefs = gql`
    "Details the Phone properties"
    type Phone {
        "The id corresponding to the parent product"
        id: String

        "The stock keeping unit identifier to differentiate between similar products based on their different attribute values"
        sku: String

        "Phone brand"
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
    }

    extend type Query {
        "Returns all phones"
        phones: [Phone]
    }
`;

module.exports = { PhoneTypeDefs };
