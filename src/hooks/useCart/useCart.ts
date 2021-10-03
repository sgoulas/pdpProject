import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { ApiProduct } from '@api';

import {
    addToCartAction,
    removeFromCartAction,
    emptyCartAction,
} from './store/actions';
import {
    cartProductsSelector,
    cartProductsTotalCostSelector,
} from './store/selectors';
import { useAppDispatch } from '@hooks';

export interface UseCart {
    totalPrice: number;
    products: ApiProduct[];
    actions: {
        addToCart: (product: ApiProduct) => void;
        removeFromCart: (id: string) => void;
        emptyCart: () => void;
    };
}

const useCart: () => UseCart = () => {
    const dispatch = useAppDispatch();
    const totalPrice = useSelector(cartProductsTotalCostSelector);
    const products = useSelector(cartProductsSelector);

    const addToCart = useCallback(
        (product: ApiProduct) => dispatch(addToCartAction({ product })),
        []
    );

    const removeFromCart = useCallback(
        (id: string) => dispatch(removeFromCartAction({ productId: id })),
        []
    );

    const emptyCart = useCallback(() => dispatch(emptyCartAction()), []);

    return {
        totalPrice,
        products,
        actions: {
            addToCart,
            removeFromCart,
            emptyCart,
        },
    };
};

export default useCart;
