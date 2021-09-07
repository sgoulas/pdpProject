const { MOCK_PHONES } = require('./phone');
const { MOCK_TABLETS } = require('./tablet');

const MOCK_PRODUCTS = [MOCK_PHONES, MOCK_TABLETS].flat();

module.exports = {
    MOCK_PRODUCTS,
};
