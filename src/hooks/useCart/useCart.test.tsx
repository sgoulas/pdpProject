/* eslint-disable react/display-name */
import React from 'react';
import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { Provider as ReduxProvider } from 'react-redux';

import { makeStore } from '@store/store';
import { ApiProduct } from '@api';
import { checkoutPage, CartProduct } from '@core';

import useCart from './useCart';

describe('useCart', () => {
    afterAll(() => {
        jest.restoreAllMocks();
        cleanup();
    });

    const mockProduct: ApiProduct = {
        id: 'mock-id',
        sku: 'mock-sku',
        brand: 'mock-brand',
        price: 50,
        availability: 50,
        description: 'mock description',
        image: 'image.png',
        name: 'mock name',
    };

    const secondMockProduct: ApiProduct = {
        ...mockProduct,
        id: 'new-mock-id',
        price: 30,
    };
    it('addToCart', () => {
        const store = makeStore();
        const { result } = renderHook(() => useCart(), {
            wrapper: ({ children }: { children: React.ReactNode }) => (
                <ReduxProvider store={store}>{children}</ReduxProvider>
            ),
        });

        expect(store.getState().cart.products).toEqual([]);

        act(() => {
            result.current.actions.addToCart({ product: mockProduct });
        });

        expect(store.getState().cart.products).toStrictEqual([
            { product: mockProduct, quantity: 1 },
        ]);
    });

    it('buyNow', () => {
        const store = makeStore();
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const useRouter = jest.spyOn(require('next/router'), 'useRouter');
        const mockPush = jest.fn();
        useRouter.mockImplementation(() => ({ push: mockPush }));

        const { result } = renderHook(() => useCart(), {
            wrapper: ({ children }: { children: React.ReactNode }) => (
                <ReduxProvider store={store}>{children}</ReduxProvider>
            ),
        });

        act(() => {
            result.current.actions.buyNow({ product: mockProduct });
        });

        expect(store.getState().cart.products).toStrictEqual([
            { product: mockProduct, quantity: 1 },
        ]);
        expect(mockPush).toHaveBeenLastCalledWith(checkoutPage());
    });
    it('removeFromCart', () => {
        const store = makeStore();
        const { result } = renderHook(() => useCart(), {
            wrapper: ({ children }: { children: React.ReactNode }) => (
                <ReduxProvider store={store}>{children}</ReduxProvider>
            ),
        });

        act(() => {
            result.current.actions.addToCart({ product: mockProduct });
            result.current.actions.removeFromCart({
                productId: mockProduct.id,
            });
        });

        expect(store.getState().cart.products).toEqual([]);
    });
    it('increaseCartInventory', () => {
        const store = makeStore();
        const { result } = renderHook(() => useCart(), {
            wrapper: ({ children }: { children: React.ReactNode }) => (
                <ReduxProvider store={store}>{children}</ReduxProvider>
            ),
        });

        const expectedQuantity = 2;

        act(() => {
            result.current.actions.addToCart({ product: mockProduct });
            result.current.actions.increaseCartInventory({
                productId: mockProduct.id,
            });
        });

        expect(store.getState().cart.products[0].quantity).toBe(
            expectedQuantity
        );
    });
    describe('decreaseCartInventory', () => {
        it('removes product if quantity is 1', () => {
            const store = makeStore();
            const { result } = renderHook(() => useCart(), {
                wrapper: ({ children }: { children: React.ReactNode }) => (
                    <ReduxProvider store={store}>{children}</ReduxProvider>
                ),
            });

            act(() => {
                result.current.actions.addToCart({ product: mockProduct });
                result.current.actions.decreaseCartInventory({
                    productId: mockProduct.id,
                });
            });

            expect(store.getState().cart.products).toEqual([]);
        });
        it('decreases quantity if quantity is greater than 1', () => {
            const store = makeStore();
            const { result } = renderHook(() => useCart(), {
                wrapper: ({ children }: { children: React.ReactNode }) => (
                    <ReduxProvider store={store}>{children}</ReduxProvider>
                ),
            });

            act(() => {
                result.current.actions.addToCart({
                    product: mockProduct,
                });
                result.current.actions.increaseCartInventory({
                    productId: mockProduct.id,
                });
                result.current.actions.decreaseCartInventory({
                    productId: mockProduct.id,
                });
            });

            expect(store.getState().cart.products[0].quantity).toBe(1);
        });
    });

    it('emptyCart', () => {
        const store = makeStore();
        const { result } = renderHook(() => useCart(), {
            wrapper: ({ children }: { children: React.ReactNode }) => (
                <ReduxProvider store={store}>{children}</ReduxProvider>
            ),
        });

        act(() => {
            result.current.actions.addToCart({
                product: mockProduct,
            });
            result.current.actions.emptyCart();
        });

        expect(store.getState().cart.products).toEqual([]);
    });
    it('returns totalPrice', () => {
        const store = makeStore();
        const { result } = renderHook(() => useCart(), {
            wrapper: ({ children }: { children: React.ReactNode }) => (
                <ReduxProvider store={store}>{children}</ReduxProvider>
            ),
        });

        act(() => {
            result.current.actions.addToCart({
                product: mockProduct,
            });
            result.current.actions.addToCart({
                product: secondMockProduct,
            });
            result.current.actions.increaseCartInventory({
                productId: secondMockProduct.id,
            });
        });

        expect(result.current.totalPrice).toEqual(
            mockProduct.price +
                secondMockProduct.price *
                    store.getState().cart.products[1].quantity
        );
    });
    it('products', () => {
        const store = makeStore();
        const { result } = renderHook(() => useCart(), {
            wrapper: ({ children }: { children: React.ReactNode }) => (
                <ReduxProvider store={store}>{children}</ReduxProvider>
            ),
        });

        act(() => {
            result.current.actions.addToCart({
                product: mockProduct,
            });
            result.current.actions.addToCart({
                product: secondMockProduct,
            });
        });

        const expected: CartProduct[] = [
            { product: mockProduct, quantity: 1 },
            { product: secondMockProduct, quantity: 1 },
        ];

        expect(store.getState().cart.products).toStrictEqual(expected);
    });

    it('totalQuantity', () => {
        const store = makeStore();
        const expectedQuantity = 3;
        const { result } = renderHook(() => useCart(), {
            wrapper: ({ children }: { children: React.ReactNode }) => (
                <ReduxProvider store={store}>{children}</ReduxProvider>
            ),
        });

        act(() => {
            result.current.actions.addToCart({
                product: mockProduct,
            });
            result.current.actions.addToCart({
                product: secondMockProduct,
            });
            result.current.actions.increaseCartInventory({
                productId: secondMockProduct.id,
            });
        });

        expect(result.current.totalQuantity).toEqual(expectedQuantity);
    });
});
