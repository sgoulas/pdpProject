import React from 'react';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

import { Typography } from '@components';

export interface ProductRatingProps {
    ratingValue: number;
    reviewCount: number;
}

const ProductRating: React.FC<ProductRatingProps> = ({
    ratingValue,
    reviewCount,
}: ProductRatingProps) => (
    <Box>
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
    </Box>
);

export default ProductRating;
