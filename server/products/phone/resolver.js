const { PHONES } = require('./mocks');

const phoneResolvers = {
    queries: {
        phones: () => PHONES,
        getPhoneById: (parent, args, context, info) =>
            PHONES.find(({ id }) => id === args.id),
    },
};

module.exports = { phoneResolvers };
