import { createAction } from '@reduxjs/toolkit';

import { withPrefix } from '@utils';

import {
    UpdateCardNumberActionPayload,
    UpdateCardNameActionPayload,
    UpdateCardExpiryActionPayload,
    UpdateCardCvcActionPayload,
} from './types';

const nameSpace = 'CHECKOUT';
const withNameSpacePrefix = withPrefix(nameSpace);

export const updateCardNumberAction =
    createAction<UpdateCardNumberActionPayload>(
        withNameSpacePrefix('update_cart_number')
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
