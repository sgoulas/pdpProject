const {
    TOTAL_PHONES,
    MOCK_PHONES,
    phoneResolvers,
    PhoneTypeDefs,
} = require('./phone');

const {
    TOTAL_TABLETS,
    MOCK_TABLETS,
    tabletResolvers,
    TabletTypeDefs,
} = require('./tablet');

const { MOCK_PRODUCTS } = require('./mocks');

module.exports = {
    PHONE: { TOTAL_PHONES, MOCK_PHONES, phoneResolvers, PhoneTypeDefs },
    TABLET: { TOTAL_TABLETS, MOCK_TABLETS, tabletResolvers, TabletTypeDefs },
    PRODUCT: { MOCK_PRODUCTS },
};
