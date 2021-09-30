import React from 'react';

import { render } from '@testUtils';

import ProductCollection, { ProductCollectionProps } from './ProductCollection';

describe('ProductCollection suite', () => {
    const defaultProps: ProductCollectionProps = {
        size: 10,
        headline: 'mock headline',
        keywords: 'keyword-1,keyword-2',
        description: 'mock description',
    };

    it('renders correctly', () => {
        const {
            container: { firstChild },
        } = render(<ProductCollection {...defaultProps} />);

        expect(firstChild).toMatchSnapshot();
    });
});
