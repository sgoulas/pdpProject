import React from 'react';
import Container from '@material-ui/core/Container';

export interface LayoutProps {
    children: React.ReactElement;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => (
    <>
        <h1>nav bar element</h1>
        <Container>
            <main>{children}</main>
        </Container>
        <footer>footer element</footer>
    </>
);

export default Layout;
