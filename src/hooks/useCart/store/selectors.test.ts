import { mock } from 'jest-mock-extended';
import faker from 'faker';

import { ApiProduct } from '@api';
import { RootState } from '@store/store';
import { mockState } from '@testUtils';
import { CartProduct } from '@core';

import {
    cartProductsSelector,
    cartProductsTotalCostSelector,
} from './selectors';

describe('CartState selectors', () => {
    it('cartProductsSelector', () => {
        const mockCartProduct: CartProduct = mock<CartProduct>();
        const state: RootState = {
            ...mockState,
            cart: {
                products: [mockCartProduct],
            },
        };

        expect(cartProductsSelector(state)).toEqual([mockCartProduct]);
    });

    it('cartProductsTotalCostSelector', () => {
        const rndPriceA = faker.datatype.number();
        const rndPriceB = faker.datatype.number();

        const mockProductA: ApiProduct = mock<ApiProduct>({ price: rndPriceA });
        const mockProductB: ApiProduct = mock<ApiProduct>({ price: rndPriceB });

        const mockCartProductA: CartProduct = {
            product: mockProductA,
            quantity: 1,
        };

        const mockCartProductB: CartProduct = {
            product: mockProductB,
            quantity: 2,
        };

        const state: RootState = {
            ...mockState,
            cart: {
                products: [mockCartProductA, mockCartProductB],
            },
        };

        const expected = rndPriceA + rndPriceB * mockCartProductB.quantity;

        expect(cartProductsTotalCostSelector(state)).toEqual(expected);
    });
});
