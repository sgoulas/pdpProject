import faker from 'faker';

import { RootState } from '@store/store';
import { mockState } from '@testUtils';

import {
    cardNumberSelector,
    cardNameSelector,
    cardExpirySelector,
    cardCvcSelector,
    isValidCardNumberSelector,
    isValidCardNameSelector,
    isValidExpirySelector,
    isValidCvcSelector,
    isValidCardPaymentFormSelector,
} from './selectors';

describe('Checkout selectors', () => {
    const state: RootState = {
        ...mockState,
    };
    const maxNameLength = 60;
    it('cardNumberSelector', () => {
        expect(cardNumberSelector(state)).toBe(
            state.checkout.paymentInfo.card.number
        );
    });
    it('cardNameSelector', () => {
        expect(cardNameSelector(state)).toBe(
            state.checkout.paymentInfo.card.name
        );
    });
    it('cardExpirySelector', () => {
        expect(cardExpirySelector(state)).toBe(
            state.checkout.paymentInfo.card.expiry
        );
    });
    it('cardCvcSelector', () => {
        expect(cardCvcSelector(state)).toBe(
            state.checkout.paymentInfo.card.cvc
        );
    });

    describe('isValidCardNumberSelector', () => {
        it('returns true for valid input', () => {
            expect(isValidCardNumberSelector(state)).toBe(true);
        });
        it('returns false for invalid input length', () => {
            expect(
                isValidCardNumberSelector({
                    ...mockState,
                    checkout: {
                        paymentInfo: {
                            card: {
                                ...mockState.checkout.paymentInfo.card,
                                number: '1234',
                            },
                        },
                    },
                })
            ).toBe(false);
        });
        it('returns false for invalid input characters', () => {
            expect(
                isValidCardNumberSelector({
                    ...mockState,
                    checkout: {
                        paymentInfo: {
                            card: {
                                ...mockState.checkout.paymentInfo.card,
                                number: '123&12-4asdwqwer',
                            },
                        },
                    },
                })
            ).toBe(false);
        });
    });

    describe('isValidCardNameSelector', () => {
        it('returns true for valid input', () => {
            expect(isValidCardNameSelector(state)).toBe(true);
        });
        it('returns false for invalid input length', () => {
            expect(
                isValidCardNameSelector({
                    ...mockState,
                    checkout: {
                        paymentInfo: {
                            card: {
                                ...mockState.checkout.paymentInfo.card,
                                name: faker.datatype.string(maxNameLength + 1),
                            },
                        },
                    },
                })
            ).toBe(false);
        });
        it('returns false for invalid input characters', () => {
            expect(
                isValidCardNameSelector({
                    ...mockState,
                    checkout: {
                        paymentInfo: {
                            card: {
                                ...mockState.checkout.paymentInfo.card,
                                name: 'Name with numbers 123124',
                            },
                        },
                    },
                })
            ).toBe(false);
        });
    });
    describe('isValidExpirySelector', () => {
        it('returns true for valid input', () => {
            expect(isValidExpirySelector(state)).toBe(true);
        });
        it('returns false for invalid month input', () => {
            expect(
                isValidExpirySelector({
                    ...mockState,
                    checkout: {
                        paymentInfo: {
                            card: {
                                ...mockState.checkout.paymentInfo.card,
                                expiry: '1325',
                            },
                        },
                    },
                })
            ).toBe(false);
        });
        it('returns false for invalid year input', () => {
            expect(
                isValidExpirySelector({
                    ...mockState,
                    checkout: {
                        paymentInfo: {
                            card: {
                                ...mockState.checkout.paymentInfo.card,
                                expiry: '1219',
                            },
                        },
                    },
                })
            ).toBe(false);
        });
    });
    describe('isValidCvcSelector', () => {
        it('returns true for valid input', () => {
            expect(isValidCvcSelector(state)).toBe(true);
        });
        it('returns false for invalid input length', () => {
            expect(
                isValidCvcSelector({
                    ...mockState,
                    checkout: {
                        paymentInfo: {
                            card: {
                                ...mockState.checkout.paymentInfo.card,
                                cvc: '1232',
                            },
                        },
                    },
                })
            ).toBe(false);
        });
        it('returns false if input contains letters', () => {
            expect(
                isValidCvcSelector({
                    ...mockState,
                    checkout: {
                        paymentInfo: {
                            card: {
                                ...mockState.checkout.paymentInfo.card,
                                cvc: '1s2',
                            },
                        },
                    },
                })
            ).toBe(false);
        });
    });
    describe('isValidCardPaymentFormSelector', () => {
        it('returns true if all field inputs are correct', () => {
            expect(isValidCardPaymentFormSelector(state)).toBe(true);
        });
        it('returns false if number input is incorrect', () => {
            expect(
                isValidCardPaymentFormSelector({
                    ...mockState,
                    checkout: {
                        paymentInfo: {
                            card: {
                                ...mockState.checkout.paymentInfo.card,
                                number: '1s2',
                            },
                        },
                    },
                })
            ).toBe(false);
        });
        it('returns false if name input is incorrect', () => {
            expect(
                isValidCardPaymentFormSelector({
                    ...mockState,
                    checkout: {
                        paymentInfo: {
                            card: {
                                ...mockState.checkout.paymentInfo.card,
                                name: '1s2',
                            },
                        },
                    },
                })
            ).toBe(false);
        });
        it('returns false if expiry input is incorrect', () => {
            expect(
                isValidCardPaymentFormSelector({
                    ...mockState,
                    checkout: {
                        paymentInfo: {
                            card: {
                                ...mockState.checkout.paymentInfo.card,
                                expiry: '1212',
                            },
                        },
                    },
                })
            ).toBe(false);
        });
        it('returns false if cvc input is incorrect', () => {
            expect(
                isValidCardPaymentFormSelector({
                    ...mockState,
                    checkout: {
                        paymentInfo: {
                            card: {
                                ...mockState.checkout.paymentInfo.card,
                                cvc: '1s2',
                            },
                        },
                    },
                })
            ).toBe(false);
        });
    });
});
