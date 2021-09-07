const { MOCK_PRODUCTS } = require('./mocks');

const productResolvers = {
    queries: {
        products: () => MOCK_PRODUCTS,
        // getPhoneById: (parent, args, context, info) =>
        //     MOCK_PHONES.find(({ id }) => id === args.id),
    },
};

module.exports = { productResolvers };
