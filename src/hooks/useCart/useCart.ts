import { useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';

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
import { CartProduct } from './store/types';
import { checkoutPage } from '@core';

export interface UseCart {
    totalPrice: number;
    products: CartProduct[];
    actions: {
        addToCart: (product: ApiProduct) => void;
        buyNow: (product: ApiProduct) => void;
        removeFromCart: (id: string) => void;
        emptyCart: () => void;
    };
}

const useCart: () => UseCart = () => {
    const dispatch = useAppDispatch();
    const totalPrice = useSelector(cartProductsTotalCostSelector);
    const products = useSelector(cartProductsSelector);
    const router = useRouter();

    const addToCart = (product: ApiProduct) =>
        dispatch(addToCartAction({ product }));

    const buyNow = (product: ApiProduct) => {
        dispatch(addToCartAction({ product }));
        router.push(checkoutPage());
    };

    const removeFromCart = (id: string) =>
        dispatch(removeFromCartAction({ productId: id }));

    const emptyCart = () => dispatch(emptyCartAction());

    return {
        totalPrice,
        products,
        actions: {
            addToCart,
            buyNow,
            removeFromCart,
            emptyCart,
        },
    };
};

export default useCart;
