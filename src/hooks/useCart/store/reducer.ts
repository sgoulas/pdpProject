import { createReducer } from '@reduxjs/toolkit';

import type { ActionHandler, CartProduct } from '@core';

import {
    addToCartAction,
    removeFromCartAction,
    increaseCartInventoryAction,
    emptyCartAction,
    decreaseCartInventoryAction,
} from './actions';
import {
    AddToCartActionPayload,
    DecreaseCartInventoryActionPayload,
    IncreaseCartInventoryActionPayload,
    RemoveFromCartActionPayload,
} from './types';

export interface CartState {
    products: CartProduct[];
}

export const initialState: CartState = {
    products: [],
};

const handleAddToCart: ActionHandler<CartState, AddToCartActionPayload> = (
    state,
    { payload: { product } }
) => {
    const indexOfProductInCart = state.products.findIndex(
        cartProduct => cartProduct.product.id === product.id
    );

    if (indexOfProductInCart === -1) {
        state.products.push({ product, quantity: 1 });
    } else {
        state.products[indexOfProductInCart].quantity += 1;
    }
};

const handleRemoveFromCart: ActionHandler<
    CartState,
    RemoveFromCartActionPayload
> = (state, { payload }) => ({
    products: state.products.filter(
        ({ product }) => product.id !== payload.productId
    ),
});

const handleIncreaseCartInventory: ActionHandler<
    CartState,
    IncreaseCartInventoryActionPayload
> = (state, { payload: { productId } }) => {
    const indexOfProductInCart = state.products.findIndex(
        cartProduct => cartProduct.product.id === productId
    );

    state.products[indexOfProductInCart].quantity += 1;
};

const handleDecreaseCartInventory: ActionHandler<
    CartState,
    DecreaseCartInventoryActionPayload
> = (state, { payload: { productId } }) => {
    const indexOfProductInCart = state.products.findIndex(
        cartProduct => cartProduct.product.id === productId
    );

    const newQuantity = state.products[indexOfProductInCart].quantity - 1;

    if (newQuantity) {
        state.products[indexOfProductInCart].quantity -= 1;
    } else {
        return {
            products: state.products.filter(
                ({ product }) => product.id !== productId
            ),
        };
    }
};

const handleEmptyCart: ActionHandler<CartState> = () => initialState;

const cartReducer = createReducer(initialState, {
    [addToCartAction.type]: handleAddToCart,
    [removeFromCartAction.type]: handleRemoveFromCart,
    [increaseCartInventoryAction.type]: handleIncreaseCartInventory,
    [decreaseCartInventoryAction.type]: handleDecreaseCartInventory,
    [emptyCartAction.type]: handleEmptyCart,
});

export default cartReducer;
