const { MOCK_PHONES, phoneResolvers, PhoneTypeDefs } = require('./phone');
const { MOCK_TABLETS, tabletResolvers, TabletTypeDefs } = require('./tablet');

const { MOCK_PRODUCTS } = require('./mocks');
const { productResolvers } = require('./resolvers');
const { ProductTypeDef } = require('./schema');

module.exports = {
    PHONE: { MOCK_PHONES, phoneResolvers, PhoneTypeDefs },
    TABLET: { MOCK_TABLETS, tabletResolvers, TabletTypeDefs },
    PRODUCT: { MOCK_PRODUCTS, productResolvers, ProductTypeDef },
};
