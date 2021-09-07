const {
    PHONE: { phoneResolvers },
} = require('./products');

const resolvers = {
    Query: {
        info: () => `Server info string`,
        ...phoneResolvers.queries,
    },
};

module.exports = { resolvers };
