import faker from 'faker';

import { mockState } from '@testUtils';

import reducer, { CheckoutState, initialState } from './reducer';
import {
    updateCardNumberAction,
    updateCardNameAction,
    updateCardExpiryAction,
    updateCardCvcAction,
    clearCheckoutInfoAction,
} from './actions';
import {
    UpdateCardNumberActionPayload,
    UpdateCardNameActionPayload,
    UpdateCardExpiryActionPayload,
    UpdateCardCvcActionPayload,
} from './types';

describe('Checkout reducer', () => {
    describe('payment method', () => {
        it('updates card number', () => {
            const previousState: CheckoutState = initialState;
            const cardNumberDigits = 16;
            const mockCardNumber = faker.datatype.string(cardNumberDigits);
            const actionPayload: UpdateCardNumberActionPayload = {
                number: mockCardNumber,
            };

            const expectedState: CheckoutState = {
                ...initialState,
                paymentInfo: {
                    card: {
                        ...initialState.paymentInfo.card,
                        number: mockCardNumber,
                    },
                },
            };

            expect(
                reducer(previousState, updateCardNumberAction(actionPayload))
            ).toEqual(expectedState);
        });
        it('updates card name', () => {
            const previousState: CheckoutState = initialState;
            const mockCardName = faker.datatype.string();
            const actionPayload: UpdateCardNameActionPayload = {
                name: mockCardName,
            };

            const expectedState: CheckoutState = {
                ...initialState,
                paymentInfo: {
                    card: {
                        ...initialState.paymentInfo.card,
                        name: mockCardName,
                    },
                },
            };

            expect(
                reducer(previousState, updateCardNameAction(actionPayload))
            ).toEqual(expectedState);
        });
        it('updates card expiry', () => {
            const previousState: CheckoutState = initialState;
            const cardExpiryDigits = 4;
            const mockCardExpiry = faker.datatype.string(cardExpiryDigits);
            const actionPayload: UpdateCardExpiryActionPayload = {
                expiry: mockCardExpiry,
            };

            const expectedState: CheckoutState = {
                ...initialState,
                paymentInfo: {
                    card: {
                        ...initialState.paymentInfo.card,
                        expiry: mockCardExpiry,
                    },
                },
            };

            expect(
                reducer(previousState, updateCardExpiryAction(actionPayload))
            ).toEqual(expectedState);
        });
        it('updates card cvc', () => {
            const previousState: CheckoutState = initialState;
            const cardCvcDigits = 3;
            const mockCardCvc = faker.datatype.string(cardCvcDigits);
            const actionPayload: UpdateCardCvcActionPayload = {
                cvc: mockCardCvc,
            };

            const expectedState: CheckoutState = {
                ...initialState,
                paymentInfo: {
                    card: {
                        ...initialState.paymentInfo.card,
                        cvc: mockCardCvc,
                    },
                },
            };

            expect(
                reducer(previousState, updateCardCvcAction(actionPayload))
            ).toEqual(expectedState);
        });

        it('clearCheckoutInfoAction', () => {
            const previousState: CheckoutState = { ...mockState.checkout };

            expect(reducer(previousState, clearCheckoutInfoAction())).toEqual(
                initialState
            );
        });
    });
});
