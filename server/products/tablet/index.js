const { TOTAL_TABLETS } = require('./constants');
const { MOCK_TABLETS } = require('./mocks');
const { tabletResolvers } = require('./resolvers');
const { TabletTypeDefs } = require('./schema');

module.exports = {
    TOTAL_TABLETS,
    MOCK_TABLETS,
    tabletResolvers,
    TabletTypeDefs,
};
