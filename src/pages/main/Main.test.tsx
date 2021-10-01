import React from 'react';

import { renderWithProviders } from '@testUtils';

import Main, { MainProps } from './Main';

describe('Main page', () => {
    const defaultProps: MainProps = {
        frontPagePhones: {
            results: [
                {
                    id: 'mock id',
                    name: 'mock name',
                    ratingValue: 0,
                    reviewCount: 0,
                    price: 240,
                    availability: 4,
                    description: 'mock description',
                    image: 'image src',
                },
            ],
        },
    };

    it('renders correctly', () => {
        const { container } = renderWithProviders(<Main {...defaultProps} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('renders correctly for no phones', () => {
        const noPhonesProps: MainProps = { frontPagePhones: { results: [] } };
        const { container } = renderWithProviders(<Main {...noPhonesProps} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('renders alert when the phones prop is undefined', () => {
        const { container } = renderWithProviders(<Main />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('renders correctly for no rating', () => {
        const noRatingProps: MainProps = {
            frontPagePhones: {
                results: [
                    {
                        id: 'mock id',
                        name: 'mock name',
                        ratingValue: undefined,
                        reviewCount: undefined,
                        price: 240,
                        availability: 4,
                        description: 'mock description',
                        image: 'image src',
                    },
                ],
            },
        };
        const { container } = renderWithProviders(<Main {...noRatingProps} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});
