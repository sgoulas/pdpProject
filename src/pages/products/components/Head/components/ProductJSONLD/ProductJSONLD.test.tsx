import React from 'react';

import { render } from '@testUtils';

import ProductJSONLD, { ProductJSONLDprops } from './ProductJSONLD';

describe('ProductJSONLD suite', () => {
    const defaultsProps: ProductJSONLDprops = {
        product: {
            id: 'mock id',
            sku: 'mock sku',
            brand: 'mock brand',
            price: 5,
            availability: 5,
            description: 'mock description',
            name: 'mock name',
            image: '',
        },
    };

    it('renders correctly', () => {
        const {
            container: { firstChild },
        } = render(<ProductJSONLD {...defaultsProps} />);

        expect(firstChild).toMatchSnapshot();
    });
});
