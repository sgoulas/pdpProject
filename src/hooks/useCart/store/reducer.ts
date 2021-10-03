import { createReducer } from '@reduxjs/toolkit';

import type { ActionHandler } from '@core';
import { ApiProduct } from '@api';

import {
    addToCartAction,
    removeFromCartAction,
    emptyCartAction,
} from './actions';
import { AddToCartActionPayload, RemoveFromCartActionPayload } from './types';

interface CartState {
    products: ApiProduct[];
}

const initialState: CartState = {
    products: [],
};

const handleAddToCart: ActionHandler<CartState, AddToCartActionPayload> = (
    state,
    { payload }
) => ({
    products: [...state.products, payload.product],
});

const handleRemoveFromCart: ActionHandler<
    CartState,
    RemoveFromCartActionPayload
> = (state, { payload }) => ({
    products: state.products.filter(({ id }) => id !== payload.productId),
});

//todo increase
//todo decrease
//todo when adding increase quantity if already added

const handleEmptyCart: ActionHandler<CartState> = () => initialState;

const cartReducer = createReducer(initialState, {
    [addToCartAction.type]: handleAddToCart,
    [removeFromCartAction.type]: handleRemoveFromCart,
    [emptyCartAction.type]: handleEmptyCart,
});

export default cartReducer;
