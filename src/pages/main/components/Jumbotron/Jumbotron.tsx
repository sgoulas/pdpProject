import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Typography } from '@components';

import useStyles from './Jumbotron.styles';
import { productDetailsPage } from '@core';

const Jumbotron: React.FC = () => {
    const classes = useStyles();
    const router = useRouter();

    const navigateToProductPage = () =>
        router.push(productDetailsPage('48e51f536c8dd'));

    return (
        <Container maxWidth={false} className={classes.container}>
            <Box textAlign="center">
                <Box pt={8}>
                    <Typography
                        variant="h2"
                        className={classes.productName}
                        onClick={navigateToProductPage}
                    >
                        iPhone 13 Pro
                    </Typography>
                </Box>
                <Box my={1}>
                    <Typography
                        variant="h4"
                        component="h2"
                        className={classes.productMoto}
                        onClick={navigateToProductPage}
                    >
                        Oh.So.Pro
                    </Typography>
                </Box>
            </Box>
            <Box
                component="div"
                mx="auto"
                position="relative"
                className={classes.imageContainer}
            >
                <Image
                    src={'/images/iphone13.jpg'}
                    alt="iphone 13 Pro"
                    layout={'fill'}
                    objectFit={'contain'}
                />
            </Box>
        </Container>
    );
};

export default Jumbotron;
