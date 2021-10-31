import React from 'react';

import { mockState, renderWithProviders, act } from '@testUtils';
import { RootState } from '@store/store';
import { checkoutPage, landingPage } from '@core';

import Checkout from './Checkout';

describe('Checkout page', () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    const mockPush = jest.fn();
    useRouter.mockImplementation(() => ({
        pathname: checkoutPage(),
        push: mockPush,
    }));
    const initialState: RootState = { ...mockState };
    it('renders correctly', () => {
        const {
            container: { firstChild },
        } = renderWithProviders(<Checkout />, { initialState });

        expect(firstChild).toMatchSnapshot();
    });

    it('redirects to landing page if cart has no items', () => {
        const noCartItemsState: RootState = {
            ...mockState,
            cart: {
                ...mockState.cart,
                products: [],
            },
        };

        renderWithProviders(<Checkout />, { initialState: noCartItemsState });

        expect(mockPush).toHaveBeenCalledWith(landingPage());
    });

    describe('switches between checkout steps', () => {
        it('switches between steps', () => {
            const {
                getAllByText,
                getByLabelText,
                queryAllByTestId,
                getAllByRole,
            } = renderWithProviders(<Checkout />, {
                initialState,
            });

            const previousBtn = getByLabelText('previous-step');
            const nextBtn = getByLabelText('next-step');

            expect(previousBtn).toBeDisabled();

            nextBtn.click();

            expect(
                queryAllByTestId('payment-info-form').length
            ).toBeGreaterThan(0);

            nextBtn.click();

            expect(getAllByText('complete order').length).toBeGreaterThan(0);

            previousBtn.click();

            expect(
                queryAllByTestId('payment-info-form').length
            ).toBeGreaterThan(0);

            previousBtn.click();

            expect(
                getAllByRole('textbox', { name: /address/i }).length
            ).toBeGreaterThan(0);
        });

        it('switches to a different step by clicking on it', () => {
            const { getByText, getByLabelText, getAllByRole } =
                renderWithProviders(<Checkout />, { initialState });

            const nextBtn = getByLabelText('next-step');

            nextBtn.click();

            const previousStepLabel = getByText(/billing address/i);

            previousStepLabel.click();

            expect(
                getAllByRole('textbox', {
                    name: /full name/i,
                }).length
            ).toBeGreaterThan(0);
        });

        it('shows spinner while processing order', () => {
            jest.useFakeTimers();

            const { getByLabelText, getAllByTestId } = renderWithProviders(
                <Checkout />,
                { initialState }
            );

            const nextBtn = getByLabelText('next-step');

            act(() => {
                nextBtn.click(); // proceed to payment info
            });
            act(() => {
                nextBtn.click(); // proceed to last step
            });
            act(() => {
                nextBtn.click(); // finish order
            });

            act(() => {
                jest.runAllTimers();
            });

            expect(getAllByTestId('loading-spinner').length).toBeGreaterThan(0);

            jest.useRealTimers();
        });
    });
});
