import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import RemoveIcon from '@material-ui/icons/RemoveOutlined';
import AddIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';

import { CartProduct } from '@core';
import { ImageWithFallback, Typography } from '@components';
import { useCart } from '@hooks';

export interface MiniCartProductCardProps {
    item: CartProduct;
}

//https://codepen.io/btcrooks/pen/MbNape

const MiniCartProductCard: React.FC<MiniCartProductCardProps> = ({
    item: { product, quantity },
}: MiniCartProductCardProps) => {
    const {
        actions: {
            decreaseCartInventory,
            increaseCartInventory,
            removeFromCart,
        },
    } = useCart();

    return (
        <article>
            <Box my={2} minWidth={300}>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <Grid item xs={4}>
                        <Box component="div" display="block">
                            <ImageWithFallback
                                src={product.image ?? ''}
                                fallbackSrc={'phoneFallBack.png'}
                                alt={product.name}
                                width={100}
                                height={100}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography display="inline">{product.name}</Typography>
                        <Typography display="inline" color="primary">
                            {' '}
                            (x{quantity})
                        </Typography>
                        <Box mt={1}>
                            <Typography>{product.price}€</Typography>
                        </Box>
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid item xs={6}>
                                <Button
                                    variant="text"
                                    startIcon={<RemoveIcon color="error" />}
                                    onClick={() =>
                                        decreaseCartInventory({
                                            productId: product.id,
                                        })
                                    }
                                >
                                    <Typography variant="body2">
                                        remove
                                    </Typography>
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    variant="text"
                                    startIcon={<AddIcon color="primary" />}
                                    onClick={() =>
                                        increaseCartInventory({
                                            productId: product.id,
                                        })
                                    }
                                >
                                    <Typography variant="body2">add</Typography>
                                </Button>
                            </Grid>
                        </Grid>
                        <div>
                            <Button
                                variant="text"
                                startIcon={<DeleteIcon color="error" />}
                                onClick={() =>
                                    removeFromCart({ productId: product.id })
                                }
                            >
                                <Typography variant="body2">
                                    remove from cart
                                </Typography>
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </article>
    );
};

export default MiniCartProductCard;
