import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Typography } from '@components';

import useStyles from './Actions.styles';

export interface ActionProps {
    disabled: boolean;
    handleAddToCard: () => void;
    handleBuyNow: () => void;
}

const Actions: React.FC<ActionProps> = ({
    disabled,
    handleAddToCard,
    handleBuyNow,
}: ActionProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(() => theme.breakpoints.up('md'));

    return (
        <Box py={8}>
            <Grid
                container
                direction={isLargeScreen ? 'row' : 'column'}
                justifyContent="center"
                alignItems="stretch"
                spacing={2}
            >
                <Grid item xs={12} md={6} lg={6} xl={6}>
                    <Button
                        data-testid="add-to-cart-btn"
                        variant="text"
                        style={{
                            backgroundColor: '#FFD814',
                        }}
                        className={classes.button}
                        onClick={handleAddToCard}
                        disabled={disabled}
                    >
                        <Typography variant="body1" component="span">
                            Add to Cart
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={12} md={6} lg={6} xl={6}>
                    <Button
                        data-testid="buy-now-btn"
                        variant="text"
                        style={{
                            backgroundColor: '#FFA41C',
                        }}
                        className={classes.button}
                        onClick={handleBuyNow}
                        disabled={disabled}
                    >
                        <Typography variant="body1" component="span">
                            Buy Now
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Actions;
