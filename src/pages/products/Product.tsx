import React, { useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import { ApiProduct } from '@api';
import { ImageWithFallback, ProductRating, Typography } from '@components';

import { Actions, Head } from './components';
import useStyles from './Product.styles';

export interface ProductProps {
    product: ApiProduct;
}

const Product: React.FC<ProductProps> = ({ product }: ProductProps) => {
    const classes = useStyles();

    // todo add redux state slice, actions, reducer
    // todo check redux persistence
    // todo [maybe] mock @api/client

    const memoizedHandleAddToCart = useCallback(
        () => console.log('add to cart product with id: ', product.id),
        [product.id]
    );
    const memoizedHandleBuyNow = useCallback(
        () => console.log('buy now product with id: ', product.id),
        [product.id]
    );

    const image = (
        <Box margin="auto" className={classes.imageContainer}>
            <ImageWithFallback
                src={product.image}
                fallbackSrc="phoneFallBack.png"
                alt={product.name}
                width={200}
                height={200}
            ></ImageWithFallback>
        </Box>
    );

    const description = (
        <Box>
            <Box mb={2}>
                <Typography variant="h2" className={classes.productName}>
                    {product.name}
                </Typography>
            </Box>
            <Box mb={2}>
                <Typography variant="body1" color="textPrimary">
                    {product.description}
                </Typography>
            </Box>
        </Box>
    );

    const rating = (
        <ProductRating
            ratingValue={product.ratingValue ?? 0}
            reviewCount={product.reviewCount ?? 0}
        />
    );

    const price = (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            mt={2}
        >
            <Typography variant="h3" component="span">
                {product.price}€
            </Typography>
            <Box display="inline" ml={1}>
                <Typography
                    variant="body2"
                    color={product.availability ? 'primary' : 'error'}
                    component="span"
                >
                    {product.availability ? 'in stock' : 'out of stock'}
                </Typography>
            </Box>
        </Box>
    );

    return (
        <>
            <Head product={product} />
            <article>
                <Box mt={1} mb={8}>
                    <Paper>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            spacing={2}
                        >
                            <Grid item xs={12} md={6}>
                                {image}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid
                                    container
                                    direction="column"
                                    alignItems="center"
                                >
                                    <Grid item xs={12}>
                                        <Box px={2}>
                                            {description}
                                            {rating}
                                            {price}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Actions
                                            disabled={!product.availability}
                                            handleAddToCard={
                                                memoizedHandleAddToCart
                                            }
                                            handleBuyNow={memoizedHandleBuyNow}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </article>
        </>
    );
};

export default Product;
