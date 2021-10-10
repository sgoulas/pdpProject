import React from 'react';

import useStyles from './NavBar.styles';
import { Search, Sidemenu, SiteName, MiniCart } from './components';

const NavBar: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.navBar}>
            <Sidemenu />
            <SiteName />
            <Search />
            <MiniCart />
        </div>
    );
};

export default NavBar;
