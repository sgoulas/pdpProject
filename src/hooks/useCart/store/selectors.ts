import { createSelector } from '@reduxjs/toolkit';

import { ApiProduct } from '@api';
import { RootState } from '@store/store';

export const cartProductsSelector: (state: RootState) => ApiProduct[] = state =>
    state.cart.products;

export const cartProductsTotalCostSelector: (state: RootState) => number =
    createSelector(cartProductsSelector, cartProducts =>
        cartProducts.reduce((acc, curr) => acc + curr.price, 0)
    );
