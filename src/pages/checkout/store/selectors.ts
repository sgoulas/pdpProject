import { RootState } from '@store/store';

export const cardNameSelector: (state: RootState) => string = state =>
    state.checkout.paymentInfo.card.name;

export const cardNumberSelector: (state: RootState) => string = state =>
    state.checkout.paymentInfo.card.number;

export const cardExpirySelector: (state: RootState) => string = state =>
    state.checkout.paymentInfo.card.expiry;

export const cardCvcSelector: (state: RootState) => string = state =>
    state.checkout.paymentInfo.card.cvc;
