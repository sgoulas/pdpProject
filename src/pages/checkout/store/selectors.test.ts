import { RootState } from '@store/store';
import { mockState } from '@testUtils';

import {
    cardNumberSelector,
    cardNameSelector,
    cardExpirySelector,
    cardCvcSelector,
} from './selectors';

describe('Checkout selectors', () => {
    const state: RootState = {
        ...mockState,
    };
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
});
