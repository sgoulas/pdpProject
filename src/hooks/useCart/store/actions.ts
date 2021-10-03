import { createAction } from '@reduxjs/toolkit';

import { withPrefix } from '@utils';

import {
    AddToCartActionPayload,
    RemoveFromCartActionPayload,
    IncreaseCartInventoryActionPayload,
    DecreaseCartInventoryActionPayload,
} from './types';

const nameSpace = 'CART';
const withNameSpacePrefix = withPrefix(nameSpace);

export const addToCartAction = createAction<AddToCartActionPayload>(
    withNameSpacePrefix('add')
);

export const removeFromCartAction = createAction<RemoveFromCartActionPayload>(
    withNameSpacePrefix('remove')
);

export const increaseCartInventoryAction =
    createAction<IncreaseCartInventoryActionPayload>(
        withNameSpacePrefix('increase')
    );

export const decreaseCartInventoryAction =
    createAction<DecreaseCartInventoryActionPayload>(
        withNameSpacePrefix('decrease')
    );

export const emptyCartAction = createAction(withNameSpacePrefix('empty'));
