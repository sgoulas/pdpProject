import React from 'react';

import { mockState, renderWithProviders, waitFor } from '@testUtils';
import { RootState } from '@store/store';
import { checkoutPage } from '@core';

import MiniCart from './MiniCart';

describe('MiniCart', () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    useRouter.mockImplementation(() => ({ pathname: 'some-page' }));
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

    it('does not show the checkout button if current page is checkout page', async () => {
        useRouter.mockImplementation(() => ({ pathname: checkoutPage() }));
        const initialState: RootState = {
            ...mockState,
        };

        const { getByTestId, queryByText } = renderWithProviders(<MiniCart />, {
            initialState,
        });

        const miniCartIcon = getByTestId('mini-cart-icon');

        miniCartIcon.click();

        await waitFor(() => expect(queryByText('checkout')).toBe(null));

        useRouter.mockImplementation(() => ({ pathname: 'some-page' }));
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

    it('shows increased inventory after clicking the add button', async () => {
        const initialState: RootState = {
            ...mockState,
        };

        const { getByTestId, getByText, queryByText } = renderWithProviders(
            <MiniCart />,
            {
                initialState,
            }
        );

        const miniCartIcon = getByTestId('mini-cart-icon');

        miniCartIcon.click();

        const increaseBtn = getByText('add');

        increaseBtn.click();

        await waitFor(() => expect(queryByText('(x2)')).toBeInTheDocument());
    });

    it('shows decreased inventory after clicking the remove button', async () => {
        const initialState: RootState = {
            ...mockState,
            cart: {
                products: [
                    {
                        product: mockState.cart.products[0].product,
                        quantity: 2,
                    },
                ],
            },
        };

        const { getByTestId, getByText, queryByText } = renderWithProviders(
            <MiniCart />,
            {
                initialState,
            }
        );

        const miniCartIcon = getByTestId('mini-cart-icon');

        miniCartIcon.click();

        const decreaseBtn = getByText('remove');

        decreaseBtn.click();

        await waitFor(() => expect(queryByText('(x1)')).toBeInTheDocument());
    });

    it('removes the product from the cart if remove from cart button is pressed', async () => {
        const initialState: RootState = {
            ...mockState,
        };

        const productName = initialState.cart.products[0].product.name;

        const { getByTestId, getByText, queryByText } = renderWithProviders(
            <MiniCart />,
            {
                initialState,
            }
        );

        const miniCartIcon = getByTestId('mini-cart-icon');

        miniCartIcon.click();

        const removeBtn = getByText('remove from cart');

        expect(getByText(productName)).toBeInTheDocument();

        removeBtn.click();

        await waitFor(() =>
            expect(queryByText(productName)).not.toBeInTheDocument()
        );
    });
});
