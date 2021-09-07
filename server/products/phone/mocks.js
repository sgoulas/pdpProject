const faker = require('faker');
const { TOTAL_PHONES } = require('./constants');

const createRandomPhone = () => ({
    availability: faker.datatype.number(5),
    brand: faker.lorem.word(10),
    description: faker.lorem.sentences(4),
    id: faker.datatype.uuid(),
    image: faker.image.imageUrl(),
    name: faker.lorem.word(10),
    price: faker.datatype.number(900),
    ratingValue: faker.datatype.number(5),
    reviewCount: faker.datatype.number(100),
    sku: faker.random.alphaNumeric(15),
    url: faker.internet.url(),
    phoneProp: 'phone',
});

const MOCK_PHONES = Array.from({ length: TOTAL_PHONES }, createRandomPhone);

module.exports = { MOCK_PHONES };
