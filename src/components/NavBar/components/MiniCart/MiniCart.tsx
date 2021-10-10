import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCart from '@material-ui/icons/ShoppingCartOutlined';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import { useCart } from '@hooks';

import { MiniCartProductCard } from './components';

//todo maybe change products to items?
//todo add a css animation for "you have no items in your cart" message
//todo add counter to the cart icon to indicate items quantity

const MiniCart: React.FC = () => {
    const { products: items } = useCart();
    const [isOpen, setIsOpen] = useState(false);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    return (
        <>
            <IconButton onClick={openCart}>
                <ShoppingCart color="secondary" />
            </IconButton>
            <SwipeableDrawer
                anchor="right"
                open={isOpen}
                onOpen={openCart}
                onClose={closeCart}
            >
                this is the mini cart
                {items.map(item => (
                    <MiniCartProductCard key={item.product.id} item={item} />
                ))}
            </SwipeableDrawer>
        </>
    );
};

export default MiniCart;
