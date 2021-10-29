import { createReducer } from '@reduxjs/toolkit';

import type { ActionHandler } from '@core';

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

export interface CheckoutState {
    paymentInfo: {
        /**
         * the card property could be ommited for our project since it is the only
         * supported payment method, but in a professional project the paymentInfo
         * would have more options.
         */
        card: {
            number: string;
            name: string;
            expiry: string;
            cvc: string;
        };
    };
}

export const initialState: CheckoutState = {
    paymentInfo: {
        card: {
            number: '',
            name: '',
            expiry: '',
            cvc: '',
        },
    },
};

const handleUpdateCardNumber: ActionHandler<
    CheckoutState,
    UpdateCardNumberActionPayload
> = (state, { payload: { number } }) => {
    state.paymentInfo.card.number = number;
};

const handleUpdateCardName: ActionHandler<
    CheckoutState,
    UpdateCardNameActionPayload
> = (state, { payload: { name } }) => {
    state.paymentInfo.card.name = name;
};

const handleUpdateCardExpiryName: ActionHandler<
    CheckoutState,
    UpdateCardExpiryActionPayload
> = (state, { payload: { expiry } }) => {
    state.paymentInfo.card.expiry = expiry;
};

const handleUpdateCardCvcName: ActionHandler<
    CheckoutState,
    UpdateCardCvcActionPayload
> = (state, { payload: { cvc } }) => {
    state.paymentInfo.card.cvc = cvc;
};

const checkoutReducer = createReducer(initialState, {
    [updateCardNumberAction.type]: handleUpdateCardNumber,
    [updateCardNameAction.type]: handleUpdateCardName,
    [updateCardExpiryAction.type]: handleUpdateCardExpiryName,
    [updateCardCvcAction.type]: handleUpdateCardCvcName,
    [clearCheckoutInfoAction.type]: () => initialState,
});

export default checkoutReducer;
