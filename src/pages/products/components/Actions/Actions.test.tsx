import React from 'react';

import { renderWithProviders } from '@testUtils';

import Actions, { ActionProps } from './Actions';

describe('Product page actions suite', () => {
    const defaultProps: ActionProps = {
        disabled: false,
        handleAddToCard: jest.fn(),
        handleBuyNow: jest.fn(),
    };

    it('renders correctly', () => {
        const { container } = renderWithProviders(
            <Actions {...defaultProps} />
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('renders correctly with buttons disabled', () => {
        const { container } = renderWithProviders(
            <Actions {...defaultProps} disabled={true} />
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('calls handleAddToCard when clicking the add to cart button', () => {
        const { getByTestId } = renderWithProviders(
            <Actions {...defaultProps} />
        );

        const addToCardBtn = getByTestId('add-to-cart-btn');

        addToCardBtn.click();

        expect(defaultProps.handleAddToCard).toHaveBeenCalled();
    });

    it('calls handleBuyNow when clicking the buy now button', () => {
        const { getByTestId } = renderWithProviders(
            <Actions {...defaultProps} />
        );

        const buyNowBtn = getByTestId('buy-now-btn');

        buyNowBtn.click();

        expect(defaultProps.handleBuyNow).toHaveBeenCalled();
    });

    it('does not call handleAddToCard or handleBuyNow when their respective buttons are disabled', () => {
        const { getByTestId } = renderWithProviders(
            <Actions {...defaultProps} disabled={true} />
        );

        const addToCardBtn = getByTestId('add-to-cart-btn');
        const buyNowBtn = getByTestId('buy-now-btn');

        addToCardBtn.click();
        buyNowBtn.click();

        expect(defaultProps.handleAddToCard).not.toHaveBeenCalled();
        expect(defaultProps.handleBuyNow).not.toHaveBeenCalled();
    });
});
