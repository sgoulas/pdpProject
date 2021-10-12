import React from 'react';

import { mockState, renderWithProviders } from '@testUtils';

import MiniCartProductCard, {
    MiniCartProductCardProps,
} from './MiniCartProductCard';

describe('MiniCartProductCard', () => {
    const defaultProps: MiniCartProductCardProps = {
        item: mockState.cart.products[0],
    };

    it('matches snapshot', () => {
        const {
            container: { firstChild },
        } = renderWithProviders(<MiniCartProductCard {...defaultProps} />);

        expect(firstChild).toMatchSnapshot();
    });
});
