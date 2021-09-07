const { MOCK_TABLETS } = require('./mocks');

const tabletResolvers = {
    queries: {
        tablets: () => MOCK_TABLETS,
        getTabletById: (parent, args, context, info) =>
            MOCK_TABLETS.find(({ id }) => id === args.id),
    },
};

module.exports = { tabletResolvers };
