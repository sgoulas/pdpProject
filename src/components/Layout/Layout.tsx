import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import { NavBar, Footer } from '@components';

import useStyles from './Layout.styles';

export interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
    const classes = useStyles();

    return (
        <Box position="relative">
            <NavBar />
            <Container className={classes.layout} maxWidth={false}>
                <Box pb={20} pt={1}>
                    <main>{children}</main>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
};

export default Layout;
