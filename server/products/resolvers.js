const { MOCK_PRODUCTS } = require('./mocks');

const productResolvers = {
    queries: {
        products: () => MOCK_PRODUCTS,
        getProductByName: (parent, args, context, info) =>
            MOCK_PRODUCTS.filter(({ name: productName }) =>
                productName
                    .toLocaleLowerCase()
                    .includes(args.name.toLocaleLowerCase())
            ),
        getProductByID: (parent, args, context, info) =>
            MOCK_PRODUCTS.find(({ id: productId }) => args.id === productId),
    },
};

module.exports = { productResolvers };
