import React from 'react';
import Container from '@material-ui/core/Container';

import { Typography } from 'components';

export interface LayoutProps {
    children: React.ReactElement;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => (
    <>
        <Typography variant="h1">nav bar element</Typography>
        <Container>
            <main>{children}</main>
        </Container>
        <footer>
            <Typography variant="body2">footer element</Typography>
        </footer>
    </>
);

export default Layout;
