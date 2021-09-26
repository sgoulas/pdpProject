import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import { client, ApiProduct } from '@api';
import { ImageWithFallback, Typography } from '@components';

import { Actions } from './components';
import { GET_ALL_PRODUCT_IDS, GET_PRODUCT_BY_ID } from './api';
import useStyles from './Product.styles';

export interface ProductProps {
    product: ApiProduct;
}

export const Product: React.FC<ProductProps> = ({ product }: ProductProps) => {
    const classes = useStyles();

    // todo add generic form actions component with 2 buttons (negative / positive)
    // todo add head, metadata, open graph, twitter card
    // todo solve the problem in the test file
    // todo add redux state slice, actions, reducer
    // todo check redux persistence
    // todo [maybe] mock @api/client

    return (
        <Box mt={1} mb={8}>
            <Paper>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={12} md={6}>
                        <Box maxWidth={450} maxHeight={450} margin="auto">
                            <ImageWithFallback
                                src={product.image}
                                fallbackSrc="phoneFallBack.png"
                                alt={product.name}
                                width={200}
                                height={200}
                            ></ImageWithFallback>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item xs={12}>
                                <Box px={1}>
                                    <Box mb={2}>
                                        <Typography
                                            variant="h2"
                                            className={classes.productName}
                                        >
                                            {product.name}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="body1"
                                        color="textPrimary"
                                    >
                                        {product.description}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Actions />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

interface ProductPageParams extends ParsedUrlQuery {
    id: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as ProductPageParams;
    const { data } = await client.query({
        query: GET_PRODUCT_BY_ID,
        variables: {
            id,
        },
    });

    return {
        props: {
            product: data.results,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await client.query({
        query: GET_ALL_PRODUCT_IDS,
    });

    const productIDs: string[] = data.results.map(
        ({ id }: { id: string }) => id
    );

    const paths = productIDs.map(id => ({ params: { id } }));

    return { paths, fallback: false };
};

export default Product;
