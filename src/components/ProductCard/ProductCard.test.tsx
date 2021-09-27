import React from 'react';

import { render } from '@testUtils';

import ProductCard, { ProductCardProps } from './ProductCard';

describe('ProductCard suite', () => {
    const defaultProps: ProductCardProps = {
        id: 'mockId',
        name: 'mockName',
        ratingValue: 3.5,
        reviewCount: 10,
        price: 100,
        availability: 200,
        description:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam',
        imageFallback: 'imageFallbackSrc',
    };

    it('matches snapshot', () => {
        const { container } = render(<ProductCard {...defaultProps} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
