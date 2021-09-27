import React from 'react';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

import { Typography } from '@components';

export interface ReviewRatingProps {
    ratingValue: number;
    reviewCount: number;
    price: number;
    availability: number;
}

const ReviewRating: React.FC<ReviewRatingProps> = ({
    ratingValue,
    reviewCount,
    price,
    availability,
}: ReviewRatingProps) => (
    <>
        <Box display="flex">
            <Box>
                <Rating
                    name="rating"
                    value={ratingValue}
                    readOnly
                    precision={0.5}
                    size="small"
                />
            </Box>
            <Box>
                <Typography variant="body2" color="primary">
                    {reviewCount}
                </Typography>
            </Box>
        </Box>
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            mb={2}
        >
            <Typography variant="body1" component="span">
                {price}€
            </Typography>
            <Box display="inline" ml={1}>
                <Typography
                    variant="body2"
                    color={availability ? 'primary' : 'error'}
                    component="span"
                >
                    {availability ? 'in stock' : 'out of stock'}
                </Typography>
            </Box>
        </Box>
    </>
);

export default ReviewRating;
