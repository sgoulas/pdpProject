import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { checkoutPage } from '@core';
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
    CartProduct,
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
    const totalPrice = useSelector(cartProductsTotalCostSelector);
    const products = useSelector(cartProductsSelector);
    const router = useRouter();

    const addToCart = ({ product }: AddToCartActionPayload) =>
        dispatch(addToCartAction({ product }));

    const buyNow = ({ product }: AddToCartActionPayload) => {
        dispatch(addToCartAction({ product }));
        router.push(checkoutPage());
    };

    const removeFromCart = ({ productId }: RemoveFromCartActionPayload) =>
        dispatch(removeFromCartAction({ productId }));

    const increaseCartInventory = ({
        productId,
    }: IncreaseCartInventoryActionPayload) =>
        dispatch(increaseCartInventoryAction({ productId }));

    const decreaseCartInventory = ({
        productId,
    }: DecreaseCartInventoryActionPayload) =>
        dispatch(decreaseCartInventoryAction({ productId }));

    const emptyCart = () => dispatch(emptyCartAction());

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
