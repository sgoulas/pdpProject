import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Image from 'next/image';
import Link from 'next/link';

import { Typography } from '@components';

import useStyles from './Jumbotron.styles';

const Jumbotron: React.FC = () => {
    const classes = useStyles();

    return (
        <Container maxWidth={false} className={classes.container}>
            <Box textAlign="center">
                <Box pt={8}>
                    <Link
                        href={`/products/${encodeURIComponent(
                            '48e51f536c8dd'
                        )}`}
                    >
                        <Typography
                            variant="h2"
                            className={classes.productName}
                        >
                            iPhone 13 Pro
                        </Typography>
                    </Link>
                </Box>
                <Box my={1}>
                    <Link
                        href={`/products/${encodeURIComponent(
                            '48e51f536c8dd'
                        )}`}
                    >
                        <Typography
                            variant="h4"
                            component="h2"
                            className={classes.productMoto}
                        >
                            Oh.So.Pro
                        </Typography>
                    </Link>
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
