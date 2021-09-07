const { MOCK_PHONES } = require('./mocks');

const phoneResolvers = {
    queries: {
        phones: () => MOCK_PHONES,
        getPhoneById: (parent, args, context, info) =>
            MOCK_PHONES.find(({ id }) => id === args.id),
    },
};

module.exports = { phoneResolvers };
