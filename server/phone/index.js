const { TOTAL_PHONES } = require('./constants');
const { PHONES } = require('./mocks');
const { phoneResolvers } = require('./resolver');
const { PhoneTypeDefs } = require('./schema');

module.exports = {
    TOTAL_PHONES,
    PHONES,
    phoneResolvers,
    PhoneTypeDefs,
};
