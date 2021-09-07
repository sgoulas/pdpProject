const {
    PHONE: { phoneResolvers },
    TABLET: { tabletResolvers },
    PRODUCT: { MOCK_PRODUCTS },
} = require('./products');

const resolvers = {
    Query: {
        info: () => `Server info string`,
        ...phoneResolvers.queries,
        ...tabletResolvers.queries,
        products: () => MOCK_PRODUCTS,
    },
    Product: {
        __resolveType(data, ctx, info) {
            if (data.phoneProp) {
                return info.schema.getType('Phone');
            }
            if (data.tabletProp) {
                return info.schema.getType('Tablet');
            }
            return null;
        },
    },
};

module.exports = { resolvers };
