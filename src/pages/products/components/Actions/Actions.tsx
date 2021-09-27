import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { Typography } from '@components';

import useStyles from './Actions.styles';

export interface ActionProps {
    handleAddToCard: () => void;
    handleBuyNow: () => void;
}

const Actions: React.FC<ActionProps> = ({
    handleAddToCard,
    handleBuyNow,
}: ActionProps) => {
    const classes = useStyles();

    return (
        <Box py={5}>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <Grid item xs={6}>
                    <Button
                        data-testid="add-to-cart-btn"
                        variant="text"
                        style={{
                            backgroundColor: '#FFD814',
                        }}
                        className={classes.button}
                        onClick={handleAddToCard}
                    >
                        <Typography variant="body1">Add to Cart</Typography>
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        data-testid="buy-now-btn"
                        variant="text"
                        style={{
                            backgroundColor: '#FFA41C',
                        }}
                        className={classes.button}
                        onClick={handleBuyNow}
                    >
                        <Typography variant="body1"> Buy Now</Typography>
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Actions;
