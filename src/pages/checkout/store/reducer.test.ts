import faker from 'faker';

import { mockState } from '@testUtils';

import reducer, { CheckoutState, initialState } from './reducer';
import {
    updateBillingFullNameAction,
    updateBillingAddressAction,
    updateCardNumberAction,
    updateCardNameAction,
    updateCardExpiryAction,
    updateCardCvcAction,
    clearCheckoutInfoAction,
} from './actions';
import {
    UpdateBillingFullNameActionPayload,
    UpdateBillingAddressActionPayload,
    UpdateCardNumberActionPayload,
    UpdateCardNameActionPayload,
    UpdateCardExpiryActionPayload,
    UpdateCardCvcActionPayload,
} from './types';

describe('Checkout reducer', () => {
    describe('billing info', () => {
        it('updates billing full name', () => {
            const previousState: CheckoutState = initialState;
            const rndFullName = `${faker.name.firstName()} ${faker.name.lastName()}`;
            const actionPayload: UpdateBillingFullNameActionPayload = {
                fullName: rndFullName,
            };

            const expectedState: CheckoutState = {
                ...initialState,
                billingInfo: {
                    ...previousState.billingInfo,
                    fullName: rndFullName,
                },
            };

            expect(
                reducer(
                    previousState,
                    updateBillingFullNameAction(actionPayload)
                )
            ).toEqual(expectedState);
        });

        it('updates billing address', () => {
            const previousState: CheckoutState = initialState;
            const rndAddress = faker.address.streetName();
            const actionPayload: UpdateBillingAddressActionPayload = {
                address: rndAddress,
            };

            const expectedState: CheckoutState = {
                ...initialState,
                billingInfo: {
                    ...previousState.billingInfo,
                    address: rndAddress,
                },
            };

            expect(
                reducer(
                    previousState,
                    updateBillingAddressAction(actionPayload)
                )
            ).toEqual(expectedState);
        });
    });
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
