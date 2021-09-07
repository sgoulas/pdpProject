const {
    PHONE: { phoneResolvers },
    TABLET: { tabletResolvers },
} = require('./products');

const resolvers = {
    Query: {
        info: () => `Server info string`,
        ...phoneResolvers.queries,
        ...tabletResolvers.queries,
    },
};

module.exports = { resolvers };
