import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

import { Typography } from '@components';

import useStyles from './ProductCard.styles';

interface ProductCardProps {
    id: string;
    name: string;
    ratingValue: number;
    reviewCount: number;
    price: number;
    availability: number;
    description: string;
    image?: string;
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
}: ProductCardProps) => {
    const classes = useStyles();

    //https://material-ui.com/system/flexbox/
    //https://material-ui.com/system/display/
    //https://material-ui.com/components/cards/
    //todo structured data here or at main page for each product
    //todo semantic HTML5 tags (image / figure, section, article, details)
    //todo name as next link
    //todo next gen image format
    //todo lazy loading
    //todo smaller card with product image on the left and the rest on the right for mobile view (make this one dynamic)
    //todo check the half rating visual bug
    //todo tests
    //todo test card being on top of navbar / footer. Add zIndex to them?

    return (
        <Card className={classes.root} key={id}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={name}
                    height="140"
                    image={
                        image ??
                        'https://m.media-amazon.com/images/I/51Q2-EXm7RS._AC_UL320_.jpg'
                    }
                    title={name}
                />
                <CardContent>
                    <Typography variant="body1" component="p">
                        {`${name} ${description}`}
                    </Typography>
                    <Box
                        component="fieldset"
                        borderColor="transparent"
                        display="flex"
                    >
                        <Box p={1} bgcolor="grey.300">
                            <Rating
                                name="rating"
                                value={ratingValue}
                                readOnly
                                precision={0.5}
                                size="small"
                            />
                        </Box>
                        <Box p={1} bgcolor="grey.300">
                            <Typography
                                component="legend"
                                className={classes.reviewCount}
                            >
                                {reviewCount}
                            </Typography>
                        </Box>
                    </Box>
                    <Typography variant="h5" component="h2">
                        {price}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {availability ? 'in stock' : 'out of stock'}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProductCard;
