import { mock } from 'jest-mock-extended';

import { ApiProduct } from '@api';

import reducer, { CartState, initialState } from './reducer';
import {
    addToCartAction,
    removeFromCartAction,
    increaseCartInventoryAction,
    decreaseCartInventoryAction,
    emptyCartAction,
} from './actions';
import {
    AddToCartActionPayload,
    RemoveFromCartActionPayload,
    IncreaseCartInventoryActionPayload,
    DecreaseCartInventoryActionPayload,
    CartProduct,
} from './types';

describe('CartState reducer', () => {
    it('handles addToCartAction', () => {
        const previousState: CartState = initialState;
        const actionPayload: AddToCartActionPayload = {
            product: mock<ApiProduct>(),
        };
        const expectedState: CartState = {
            products: [{ product: actionPayload.product, quantity: 1 }],
        };

        expect(reducer(previousState, addToCartAction(actionPayload))).toEqual(
            expectedState
        );
    });

    it('handles removeFromCartAction', () => {
        const previousState: CartState = {
            products: [
                { product: mock<ApiProduct>({ id: 'mockId' }), quantity: 1 },
            ],
        };
        const actionPayload: RemoveFromCartActionPayload = {
            productId: 'mockId',
        };
        const expectedState: CartState = { products: [] };

        expect(
            reducer(previousState, removeFromCartAction(actionPayload))
        ).toEqual(expectedState);
    });

    it('handles increaseCartInventoryAction', () => {
        const previousState: CartState = {
            products: [
                {
                    product: mock<ApiProduct>({ id: 'mockId' }),
                    quantity: 1,
                },
            ],
        };
        const actionPayload: IncreaseCartInventoryActionPayload = {
            productId: 'mockId',
        };
        const expectedState: CartState = {
            products: [
                { product: previousState.products[0].product, quantity: 2 },
            ],
        };

        expect(
            reducer(previousState, increaseCartInventoryAction(actionPayload))
        ).toEqual(expectedState);
    });

    describe('handles decreaseCartInventoryAction', () => {
        it('when quantity > 1', () => {
            const previousState: CartState = {
                products: [
                    {
                        product: mock<ApiProduct>({ id: 'mockId' }),
                        quantity: 2,
                    },
                ],
            };
            const actionPayload: DecreaseCartInventoryActionPayload = {
                productId: 'mockId',
            };
            const expectedState: CartState = {
                products: [
                    { product: previousState.products[0].product, quantity: 1 },
                ],
            };

            expect(
                reducer(
                    previousState,
                    decreaseCartInventoryAction(actionPayload)
                )
            ).toEqual(expectedState);
        });

        it('when quantity === 1', () => {
            const previousState: CartState = {
                products: [
                    {
                        product: mock<ApiProduct>({ id: 'mockId' }),
                        quantity: 1,
                    },
                ],
            };
            const actionPayload: DecreaseCartInventoryActionPayload = {
                productId: 'mockId',
            };
            const expectedState: CartState = {
                products: [],
            };

            expect(
                reducer(
                    previousState,
                    decreaseCartInventoryAction(actionPayload)
                )
            ).toEqual(expectedState);
        });
    });

    it('handles emptyCartAction', () => {
        const previousState: CartState = {
            products: [mock<CartProduct>()],
        };

        expect(reducer(previousState, emptyCartAction())).toEqual(initialState);
    });
});
