import React from 'react';

export interface LayoutProps {
    children: React.ReactChildren;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => (
    <>
        <h1>nav bar element</h1>
        {children}
        <footer>footer element</footer>
    </>
);

export default Layout;
