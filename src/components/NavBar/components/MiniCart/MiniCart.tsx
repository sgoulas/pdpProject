import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
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

const MiniCart: React.FC = () => {
    const classes = useStyles();
    const { products: items, totalPrice, totalQuantity } = useCart();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const priceDecimals = 2;
    const hasItemsInCart = items.length > 0;
    const isCheckoutPage = router.pathname === checkoutPage();

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const goToCheckoutPage = () => {
        closeCart();
        router.push(checkoutPage());
    };

    const quantityMessage = `you have ${
        totalQuantity === 0 ? ' no ' : totalQuantity
    } ${totalQuantity === 1 ? 'item' : 'items'} in your cart`;

    return (
        <>
            <IconButton onClick={openCart} data-testid="mini-cart-icon">
                <Badge badgeContent={totalQuantity} color="error">
                    <ShoppingCart color="secondary" />
                </Badge>
            </IconButton>
            <SwipeableDrawer
                anchor="right"
                open={isOpen}
                onOpen={openCart}
                onClose={closeCart}
            >
                <Box mx={2} my={0.5}>
                    <Typography variant="body2">{quantityMessage}</Typography>
                </Box>
                <Divider variant="middle" />
                {items.map(item => (
                    <MiniCartProductCard key={item.product.id} item={item} />
                ))}
                <Divider variant="middle" />
                {hasItemsInCart && (
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
                                <Typography variant="h5">
                                    {totalPrice.toFixed(priceDecimals)}€
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                )}
                {hasItemsInCart && !isCheckoutPage && (
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
                )}
            </SwipeableDrawer>
        </>
    );
};

export default MiniCart;
