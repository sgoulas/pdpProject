import React from 'react';

import { render } from '@testUtils';

import Actions, { ActionProps } from './Actions';

describe('Product page actions suite', () => {
    const defaultProps: ActionProps = {
        handleAddToCard: jest.fn(),
        handleBuyNow: jest.fn(),
    };

    it('calls handleAddToCard when clicking the add to cart button', () => {
        const { getByTestId } = render(<Actions {...defaultProps} />);

        const addToCardBtn = getByTestId('add-to-cart-btn');

        addToCardBtn.click();

        expect(defaultProps.handleAddToCard).toHaveBeenCalled();
    });

    it('calls handleBuyNow when clicking the buy now button', () => {
        const { getByTestId } = render(<Actions {...defaultProps} />);

        const buyNowBtn = getByTestId('buy-now-btn');

        buyNowBtn.click();

        expect(defaultProps.handleBuyNow).toHaveBeenCalled();
    });
});
