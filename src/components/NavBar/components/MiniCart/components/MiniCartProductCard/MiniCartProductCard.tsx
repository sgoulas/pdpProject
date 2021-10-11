import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/RemoveOutlined';
import AddIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutline';

// import Link from 'next/link';

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
                        <Grid xs={6}>
                            <IconButton
                                onClick={() =>
                                    decreaseCartInventory({
                                        productId: product.id,
                                    })
                                }
                            >
                                <RemoveIcon color="error" />
                            </IconButton>
                        </Grid>
                        <Grid xs={6}>
                            <IconButton
                                onClick={() =>
                                    increaseCartInventory({
                                        productId: product.id,
                                    })
                                }
                            >
                                <AddIcon color="primary" />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <div>
                        <IconButton
                            onClick={() =>
                                removeFromCart({ productId: product.id })
                            }
                        >
                            <DeleteIcon color="error" />
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
        </article>
    );
};

export default MiniCartProductCard;
