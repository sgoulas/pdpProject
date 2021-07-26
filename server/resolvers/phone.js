const { PHONES } = require('../mocks/phones');

const phoneResolvers = {
    queries: {
        phones: () => PHONES,
    },
};

module.exports = { phoneResolvers };
