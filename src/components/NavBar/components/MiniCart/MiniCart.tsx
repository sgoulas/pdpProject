import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCart from '@material-ui/icons/ShoppingCartOutlined';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';

import { useCart } from '@hooks';
import { Divider, Typography } from '@components';

import { MiniCartProductCard } from './components';
import useStyles from './MiniCart.styles';
import { checkoutPage } from '@core';

//todo maybe change products to items?
//todo add a css animation for "you have no items in your cart" message
//todo add counter to the cart icon to indicate items quantity

const MiniCart: React.FC = () => {
    const classes = useStyles();
    const { products: items, totalPrice } = useCart();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const goToCheckoutPage = () => {
        closeCart();
        router.push(checkoutPage());
    };

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
                <Divider variant="middle" />
                {items.map(item => (
                    <MiniCartProductCard key={item.product.id} item={item} />
                ))}
                <Divider variant="middle" />
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Box ml={2}>
                            <Typography variant="body1">
                                total price:
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box mr={2}>
                            <Typography variant="h5" component="p">
                                {totalPrice}€
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Box textAlign="center" mt={8} mr="auto" ml="auto">
                    <Button
                        data-testid="checkout-button"
                        variant="text"
                        style={{
                            backgroundColor: '#FFA41C',
                        }}
                        className={classes.checkoutBtn}
                        onClick={goToCheckoutPage}
                    >
                        <Typography variant="body1" component="span">
                            checkout
                        </Typography>
                    </Button>
                </Box>
            </SwipeableDrawer>
        </>
    );
};

export default MiniCart;
