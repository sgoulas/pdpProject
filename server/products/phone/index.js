const { TOTAL_PHONES } = require('./constants');
const { MOCK_PHONES } = require('./mocks');
const { phoneResolvers } = require('./resolver');
const { PhoneTypeDefs } = require('./schema');

module.exports = {
    TOTAL_PHONES,
    MOCK_PHONES,
    phoneResolvers,
    PhoneTypeDefs,
};
