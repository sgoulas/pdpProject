import React from 'react';

import { renderWithProviders } from '@testUtils';

import Product, { ProductProps } from './Product';

describe('Main page suite', () => {
    const defaultProps: ProductProps = {
        product: {
            availability: 5,
            brand: 'mockBrand',
            description: 'mock description',
            id: 'mockID',
            image: 'phone_48e51f536c8a.png',
            name: 'mockName',
            price: 120,
            ratingValue: 4.5,
            reviewCount: 1234,
            sku: 'mockSKU',
        },
    };

    it('matches snapshot', () => {
        const { container } = renderWithProviders(
            <Product {...defaultProps} />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot when product availability is zero', () => {
        const zeroAvailabilityProps: ProductProps = {
            product: { ...defaultProps.product, availability: 0 },
        };
        const { container } = renderWithProviders(
            <Product {...zeroAvailabilityProps} />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot when rating and reviews are zero', () => {
        const zeroReviewsProps: ProductProps = {
            product: {
                ...defaultProps.product,
                ratingValue: undefined,
                reviewCount: undefined,
            },
        };
        const { container } = renderWithProviders(
            <Product {...zeroReviewsProps} />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
