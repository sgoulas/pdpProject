const { MOCK_PRODUCTS } = require('./mocks');

const productResolvers = {
    queries: {
        allProducts: () => MOCK_PRODUCTS,
        products: (parent, args, context, info) =>
            MOCK_PRODUCTS.filter(({ name: productName }) =>
                productName
                    .toLocaleLowerCase()
                    .includes(args.name.toLocaleLowerCase())
            ),
        product: (parent, args, context, info) =>
            MOCK_PRODUCTS.find(({ id: productId }) => args.id === productId),
    },
};

module.exports = { productResolvers };
