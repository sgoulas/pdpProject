import React from 'react';
import Container from '@material-ui/core/Container';

import { NavBar, Footer } from '@components';

import useStyles from './Layout.styles';

export interface LayoutProps {
    children: React.ReactElement;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
    const classes = useStyles();

    return (
        <>
            <NavBar />
            <Container className={classes.layout} maxWidth={false}>
                <main>{children}</main>
            </Container>
            <Footer />
        </>
    );
};

export default Layout;
