import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
// import Link from 'next/link';

import { CartProduct } from '@core';
import { ImageWithFallback, Typography } from '@components';

export interface MiniCartProductCardProps {
    item: CartProduct;
}

//https://codepen.io/btcrooks/pen/MbNape

const MiniCartProductCard: React.FC<MiniCartProductCardProps> = ({
    item: { product, quantity },
}: MiniCartProductCardProps) => (
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
                <Typography>
                    {product.name} x {quantity}
                </Typography>
            </Grid>
        </Grid>
    </article>
);

export default MiniCartProductCard;
