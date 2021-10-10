import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store/store';
import { CartProduct } from '@core';

export const cartProductsSelector: (state: RootState) => CartProduct[] =
    state => state.cart.products;

export const cartProductsTotalCostSelector: (state: RootState) => number =
    createSelector(cartProductsSelector, cartProducts =>
        cartProducts.reduce((acc, curr) => acc + curr.product.price, 0)
    );
