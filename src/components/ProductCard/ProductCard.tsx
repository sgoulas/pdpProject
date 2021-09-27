import React from 'react';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';

import { ImageWithFallback, ReviewRating } from '@components';

import useStyles from './ProductCard.styles';

export interface ProductCardProps {
    id: string;
    name: string;
    ratingValue: number;
    reviewCount: number;
    price: number;
    availability: number;
    description: string;
    image?: string;
    imageFallback: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
    id,
    name,
    ratingValue,
    reviewCount,
    price,
    availability,
    description,
    image,
    imageFallback,
}: ProductCardProps) => {
    const classes = useStyles();

    return (
        <article className={classes.cardContainer}>
            <Card key={id} className={classes.cardRoot}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={5} md={12}>
                        <Box
                            component="div"
                            display="block"
                            className={classes.image}
                            mx="auto"
                        >
                            <ImageWithFallback
                                src={image ?? ''}
                                fallbackSrc={imageFallback}
                                alt={name}
                                width={200}
                                height={200}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={7} md={12}>
                        <Box px={1}>
                            <Box component="div">
                                <Link
                                    href={`/products/${encodeURIComponent(id)}`}
                                >
                                    <a className={classes.description}>
                                        <Box
                                            component="h4"
                                            display="inline"
                                            mr={0.5}
                                        >
                                            {name}
                                        </Box>
                                        <Box component="p" display="inline">
                                            {description}
                                        </Box>
                                    </a>
                                </Link>
                            </Box>
                            <ReviewRating
                                price={price}
                                reviewCount={reviewCount}
                                availability={availability}
                                ratingValue={ratingValue}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </article>
    );
};

export default ProductCard;
