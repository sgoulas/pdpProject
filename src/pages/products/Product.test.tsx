import React from 'react';
import * as faker from 'faker';

import { render } from '@testUtils';

import Product, { ProductProps } from './[id]';

xdescribe('Main page suite', () => {
    const mockDescriptionSentences = 2;

    const defaultProps: ProductProps = {
        product: {
            availability: faker.datatype.number(),
            brand: faker.random.word(),
            description: faker.lorem.sentences(mockDescriptionSentences),
            id: faker.datatype.uuid(),
            image: 'phone_48e51f536c8a.png',
            name: faker.commerce.productName(),
            price: parseFloat(faker.commerce.price()),
            ratingValue: faker.datatype.float(),
            reviewCount: faker.datatype.number(),
            sku: faker.datatype.uuid(),
        },
    };

    xit('matches snapshot', () => {
        const { container } = render(<Product {...defaultProps} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
