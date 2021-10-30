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
    isValidCardExpirySelector,
    isValidCardCvcSelector,
    isValidCardPaymentFormSelector,
    billingFullNameSelector,
    billingAddressSelector,
    isValidBillingFullName,
    isValidBillingAddress,
    isValidBillingInfoForm,
} from './selectors';

describe('Checkout selectors', () => {
    const state: RootState = {
        ...mockState,
    };
    const maxNameLength = 60;
    const maxAddressLength = 30;
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
                        ...mockState.checkout,
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
                        ...mockState.checkout,
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
                        ...mockState.checkout,
                        paymentInfo: {
                            card: {
                                ...mockState.checkout.paymentInfo.card,
                                name: faker.datatype.string(maxNameLength + 1),
                            },
                        },
                    },
                })
            ).toBe(false);
            expect(
                isValidCardNameSelector({
                    ...mockState,
                    checkout: {
                        ...mockState.checkout,
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
                        ...mockState.checkout,
                        paymentInfo: {
                            card: {
                                ...mockState.checkout.paymentInfo.card,
                                name: '',
                            },
                        },
                    },
                })
            ).toBe(false);
        });
    });
    describe('isValidExpirySelector', () => {
        it('returns true for valid input', () => {
            expect(isValidCardExpirySelector(state)).toBe(true);
        });
        it('returns false for invalid month input', () => {
            expect(
                isValidCardExpirySelector({
                    ...mockState,
                    checkout: {
                        ...mockState.checkout,
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
                isValidCardExpirySelector({
                    ...mockState,
                    checkout: {
                        ...mockState.checkout,
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
            expect(isValidCardCvcSelector(state)).toBe(true);
        });
        it('returns false for invalid input length', () => {
            expect(
                isValidCardCvcSelector({
                    ...mockState,
                    checkout: {
                        ...mockState.checkout,
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
                isValidCardCvcSelector({
                    ...mockState,
                    checkout: {
                        ...mockState.checkout,
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
                        ...mockState.checkout,
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
                        ...mockState.checkout,
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
                        ...mockState.checkout,
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
                        ...mockState.checkout,
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

    describe('billingInfo', () => {
        it('billingFullNameSelector', () => {
            expect(billingFullNameSelector(state)).toBe(
                state.checkout.billingInfo.fullName
            );
        });

        it('billingAddressSelector', () => {
            expect(billingAddressSelector(state)).toBe(
                state.checkout.billingInfo.address
            );
        });

        it('billingAddressSelector', () => {
            expect(billingAddressSelector(state)).toBe(
                state.checkout.billingInfo.address
            );
        });

        describe('isValidBillingFullName', () => {
            it('returns true for valid name', () => {
                expect(isValidBillingFullName(state)).toBe(true);
            });

            it('returns false for empty name', () => {
                expect(
                    isValidBillingFullName({
                        ...state,
                        checkout: {
                            ...mockState.checkout,
                            billingInfo: {
                                ...mockState.checkout.billingInfo,
                                fullName: '',
                            },
                        },
                    })
                ).toBe(false);
            });

            it('returns false for invalid name', () => {
                expect(
                    isValidBillingFullName({
                        ...state,
                        checkout: {
                            ...mockState.checkout,
                            billingInfo: {
                                ...mockState.checkout.billingInfo,
                                fullName: '12324',
                            },
                        },
                    })
                ).toBe(false);
            });
        });

        describe('isValidBillingAddress', () => {
            it('return true for valid address', () => {
                expect(isValidBillingAddress(state)).toBe(true);
            });

            it('return false for empty address', () => {
                expect(
                    isValidBillingAddress({
                        ...state,
                        checkout: {
                            ...mockState.checkout,
                            billingInfo: {
                                ...mockState.checkout.billingInfo,
                                address: '',
                            },
                        },
                    })
                ).toBe(false);
            });

            it('returns false for invalid address length', () => {
                expect(
                    isValidBillingAddress({
                        ...state,
                        checkout: {
                            ...mockState.checkout,
                            billingInfo: {
                                ...mockState.checkout.billingInfo,
                                address: faker.datatype.string(
                                    maxAddressLength + 1
                                ),
                            },
                        },
                    })
                ).toBe(false);
            });
        });

        describe('isValidBillingInfoForm', () => {
            it('returns true for valid inputs', () => {
                expect(isValidBillingInfoForm(state)).toBe(true);
            });
            it('returns false for invalid name', () => {
                expect(
                    isValidBillingInfoForm({
                        ...state,
                        checkout: {
                            ...mockState.checkout,
                            billingInfo: {
                                ...mockState.checkout.billingInfo,
                                fullName: '12324',
                            },
                        },
                    })
                ).toBe(false);
            });
            it('returns false for invalid address', () => {
                expect(
                    isValidBillingInfoForm({
                        ...state,
                        checkout: {
                            ...mockState.checkout,
                            billingInfo: {
                                ...mockState.checkout.billingInfo,
                                address: '',
                            },
                        },
                    })
                ).toBe(false);
            });
        });
    });
});
