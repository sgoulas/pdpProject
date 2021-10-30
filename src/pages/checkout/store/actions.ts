import { createAction } from '@reduxjs/toolkit';

import { withPrefix } from '@utils';

import {
    UpdateBillingFullNameActionPayload,
    UpdateBillingAddressActionPayload,
    UpdateCardNumberActionPayload,
    UpdateCardNameActionPayload,
    UpdateCardExpiryActionPayload,
    UpdateCardCvcActionPayload,
} from './types';

const nameSpace = 'CHECKOUT';
const withNameSpacePrefix = withPrefix(nameSpace);

export const updateBillingFullNameAction =
    createAction<UpdateBillingFullNameActionPayload>(
        withNameSpacePrefix('update_billing_name')
    );

export const updateBillingAddressAction =
    createAction<UpdateBillingAddressActionPayload>(
        withNameSpacePrefix('update_billing_address')
    );

export const updateCardNumberAction =
    createAction<UpdateCardNumberActionPayload>(
        withNameSpacePrefix('update_card_number')
    );

export const updateCardNameAction = createAction<UpdateCardNameActionPayload>(
    withNameSpacePrefix('update_card_name')
);

export const updateCardExpiryAction =
    createAction<UpdateCardExpiryActionPayload>(
        withNameSpacePrefix('update_card_expiry')
    );

export const updateCardCvcAction = createAction<UpdateCardCvcActionPayload>(
    withNameSpacePrefix('update_card_cvc')
);

export const clearCheckoutInfoAction = createAction(
    withNameSpacePrefix('clear')
);
