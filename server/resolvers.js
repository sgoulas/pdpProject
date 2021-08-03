const { phoneResolvers } = require('./phone');

const resolvers = {
    Query: {
        info: () => `Server info string`,
        ...phoneResolvers.queries,
    },
};

module.exports = { resolvers };
