import * as faker from 'faker';

import { productDetailsPage } from './urlConstructors';

describe('url constructors suite', () => {
    it('productDetailsPage', () => {
        const randomId = faker.random.alphaNumeric();

        const expected = `/products/${encodeURIComponent(randomId)}`;

        expect(productDetailsPage(randomId)).toEqual(expected);
    });
});
