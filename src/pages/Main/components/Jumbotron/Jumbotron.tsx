import React from 'react';
import Box from '@material-ui/core/Box';
import { Typography } from '@components';
import Container from '@material-ui/core/Container';
import Image from 'next/image';

import useStyles from './Jumbotron.styles';

const Jumbotron: React.FC = () => {
    const classes = useStyles();

    return (
        <Container maxWidth={false} className={classes.container}>
            <Box textAlign="center">
                <Box pt={8}>
                    <Typography
                        variant="h2"
                        component="h3"
                        className={classes.productName}
                    >
                        iPhone 13 Pro
                    </Typography>
                </Box>
                <Box my={1}>
                    <Typography
                        variant="h4"
                        component="h2"
                        className={classes.productMoto}
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
                // width={400}
                // height={500}
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
