import { mock } from 'jest-mock-extended';
import faker from 'faker';

import { ApiProduct } from '@api';
import { RootState } from '@store/store';
import { mockState } from '@testUtils';

import {
    cartProductsSelector,
    cartProductsTotalCostSelector,
} from './selectors';
import { CartProduct } from './types';

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

        const mockCartProductA: CartProduct = mock<CartProduct>({
            product: mockProductA,
        });
        const mockCartProductB: CartProduct = mock<CartProduct>({
            product: mockProductB,
        });

        const state: RootState = {
            ...mockState,
            cart: {
                products: [mockCartProductA, mockCartProductB],
            },
        };

        const expected = rndPriceA + rndPriceB;

        expect(cartProductsTotalCostSelector(state)).toEqual(expected);
    });
});
