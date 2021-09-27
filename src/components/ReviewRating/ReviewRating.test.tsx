import React from 'react';

import { render } from '@testUtils';

import ReviewRating, { ReviewRatingProps } from './ReviewRating';

describe('ReviewRating suite', () => {
    const defaultProps: ReviewRatingProps = {
        ratingValue: 3.5,
        reviewCount: 10,
        price: 100,
        availability: 200,
    };

    it('matches snapshot', () => {
        const { container } = render(<ReviewRating {...defaultProps} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('shows in stock message if availability is greater than zero', () => {
        const { getByText } = render(<ReviewRating {...defaultProps} />);

        expect(getByText('in stock')).toBeInTheDocument();
    });

    it('shows out of stock message if availability is zero', () => {
        const props: ReviewRatingProps = {
            ...defaultProps,
            availability: 0,
        };

        const { getByText } = render(<ReviewRating {...props} />);

        expect(getByText('out of stock')).toBeInTheDocument();
    });
});
