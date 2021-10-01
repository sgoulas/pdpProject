import React from 'react';

import { render } from '@testUtils';

import ProductCard, { ProductCardProps } from './ProductCard';

describe('ProductCard', () => {
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

    it('shows in stock message if availability is greater than zero', () => {
        const { getByText } = render(<ProductCard {...defaultProps} />);

        expect(getByText('in stock')).toBeInTheDocument();
    });

    it('shows out of stock message if availability is zero', () => {
        const props: ProductCardProps = { ...defaultProps, availability: 0 };

        const { getByText } = render(<ProductCard {...props} />);

        expect(getByText('out of stock')).toBeInTheDocument();
    });
});
