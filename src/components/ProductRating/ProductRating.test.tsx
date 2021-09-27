import React from 'react';

import { render } from '@testUtils';

import ProductRating, { ProductRatingProps } from './ProductRating';

describe('ProductRating suite', () => {
    const defaultProps: ProductRatingProps = {
        ratingValue: 3.5,
        reviewCount: 10,
    };

    it('matches snapshot', () => {
        const { container } = render(<ProductRating {...defaultProps} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
