const faker = require('faker');
const { TOTAL_PHONES } = require('../../constants');

const createRandomPhone = () => ({
    availability: faker.datatype.number(5),
    brand: faker.lorem.word(10),
    description: faker.lorem.sentences(4),
    id: faker.random.alphaNumeric,
    image: faker.image.imageUrl(),
    name: faker.lorem.word(10),
    price: 0.15,
    ratingValue: 4.5,
    reviewCount: 3,
    sku: faker.random.alphaNumeric(15),
    url: faker.internet.url(),
});

const PHONES = Array.from({ length: TOTAL_PHONES }, createRandomPhone);

module.exports = { PHONES };
