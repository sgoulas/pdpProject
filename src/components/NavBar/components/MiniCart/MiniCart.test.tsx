import React from 'react';

import { mockState, renderWithProviders, waitFor } from '@testUtils';
import { RootState } from '@store/store';

import MiniCart from './MiniCart';
import { checkoutPage } from '@core';

describe('MiniCart', () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });
    it('renders correctly for empty cart', () => {
        const {
            container: { firstChild },
        } = renderWithProviders(<MiniCart />);

        expect(firstChild).toMatchSnapshot();
    });
    it('renders correctly for non empty cart', () => {
        const initialState: RootState = { ...mockState };

        const {
            container: { firstChild },
            getByTestId,
        } = renderWithProviders(<MiniCart />, { initialState });

        const miniCartIcon = getByTestId('mini-cart-icon');

        miniCartIcon.click();

        expect(firstChild).toMatchSnapshot();
    });

    it('does not show the checkout button if there are no product in the cart', async () => {
        const initialState: RootState = {
            ...mockState,
            cart: { products: [] },
        };

        const { getByTestId, queryByText } = renderWithProviders(<MiniCart />, {
            initialState,
        });

        const miniCartIcon = getByTestId('mini-cart-icon');

        miniCartIcon.click();

        await waitFor(() => expect(queryByText('checkout')).toBe(null));
    });

    it('shows the checkout button if there are product(s) in the cart', async () => {
        const initialState: RootState = {
            ...mockState,
        };

        const { getByTestId, queryByText } = renderWithProviders(<MiniCart />, {
            initialState,
        });

        const miniCartIcon = getByTestId('mini-cart-icon');

        miniCartIcon.click();

        await waitFor(() =>
            expect(queryByText('checkout')).toBeInTheDocument()
        );
    });

    it('navigates to checkout page if the checkout button is clicked', async () => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const useRouter = jest.spyOn(require('next/router'), 'useRouter');
        const mockPush = jest.fn();
        useRouter.mockImplementation(() => ({ push: mockPush }));

        const initialState: RootState = {
            ...mockState,
        };

        const { getByTestId, queryByText, getByText } = renderWithProviders(
            <MiniCart />,
            {
                initialState,
            }
        );

        const miniCartIcon = getByTestId('mini-cart-icon');

        miniCartIcon.click();

        await waitFor(() =>
            expect(queryByText('checkout')).toBeInTheDocument()
        );

        const checkoutBtn = getByText('checkout');

        checkoutBtn.click();

        expect(mockPush).toHaveBeenCalledWith(checkoutPage());
    });
});
