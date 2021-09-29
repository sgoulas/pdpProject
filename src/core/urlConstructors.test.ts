import * as faker from 'faker';

import { SITE_URL } from '@core';

import {
    productDetailsPage,
    productImageUrl,
    absoluteURL,
} from './urlConstructors';

describe('url constructors suite', () => {
    it('productDetailsPage', () => {
        const randomId = faker.random.alphaNumeric();

        const expected = `/products/${encodeURIComponent(randomId)}`;

        expect(productDetailsPage(randomId)).toEqual(expected);
    });

    it('productImageUrl', () => {
        const randomImage = faker.random.image();

        const expected = `$/images/${randomImage}`;

        expect(productImageUrl(randomImage)).toEqual(expected);
    });

    it('absoluteURL', () => {
        const relativePath = `${faker.random.alphaNumeric()}`;

        const expected = `${SITE_URL}${relativePath}`;

        expect(absoluteURL(relativePath)).toEqual(expected);
    });
});
