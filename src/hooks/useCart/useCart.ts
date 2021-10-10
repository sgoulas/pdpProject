import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { checkoutPage, CartProduct } from '@core';
import { useAppDispatch } from '@hooks';

import {
    addToCartAction,
    removeFromCartAction,
    increaseCartInventoryAction,
    emptyCartAction,
    decreaseCartInventoryAction,
} from './store/actions';
import {
    cartProductsSelector,
    cartProductsTotalCostSelector,
} from './store/selectors';
import {
    AddToCartActionPayload,
    IncreaseCartInventoryActionPayload,
    DecreaseCartInventoryActionPayload,
    RemoveFromCartActionPayload,
} from './store/types';

export interface UseCart {
    totalPrice: number;
    products: CartProduct[];
    actions: {
        addToCart: (payload: AddToCartActionPayload) => void;
        buyNow: (payload: AddToCartActionPayload) => void;
        removeFromCart: (payload: RemoveFromCartActionPayload) => void;
        increaseCartInventory: (
            paylaod: IncreaseCartInventoryActionPayload
        ) => void;
        decreaseCartInventory: (
            paylaod: DecreaseCartInventoryActionPayload
        ) => void;
        emptyCart: () => void;
    };
}

const useCart: () => UseCart = () => {
    const dispatch = useAppDispatch();
    const totalPrice: number = useSelector(cartProductsTotalCostSelector);
    const products: CartProduct[] = useSelector(cartProductsSelector);
    const router = useRouter();

    const addToCart: ({ product }: AddToCartActionPayload) => void = ({
        product,
    }) => dispatch(addToCartAction({ product }));

    const buyNow: ({ product }: AddToCartActionPayload) => void = ({
        product,
    }) => {
        dispatch(addToCartAction({ product }));
        router.push(checkoutPage());
    };

    const removeFromCart: ({ productId }: RemoveFromCartActionPayload) => void =
        ({ productId }) => dispatch(removeFromCartAction({ productId }));

    const increaseCartInventory: ({
        productId,
    }: IncreaseCartInventoryActionPayload) => void = ({ productId }) =>
        dispatch(increaseCartInventoryAction({ productId }));

    const decreaseCartInventory: ({
        productId,
    }: DecreaseCartInventoryActionPayload) => void = ({ productId }) =>
        dispatch(decreaseCartInventoryAction({ productId }));

    const emptyCart: () => void = () => dispatch(emptyCartAction());

    return {
        totalPrice,
        products,
        actions: {
            addToCart,
            buyNow,
            removeFromCart,
            increaseCartInventory,
            decreaseCartInventory,
            emptyCart,
        },
    };
};

export default useCart;
