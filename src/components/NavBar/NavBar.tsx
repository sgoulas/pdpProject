import React from 'react';

import { Typography } from '@components';
import { SITE_NAME } from '@core';

import useStyles from './NavBar.styles';
import { Sidemenu, Search } from './components';

const NavBar: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.navBar}>
            <div>
                <Sidemenu />
            </div>
            <div>
                <Typography
                    component="h1"
                    variant="h5"
                    color="textSecondary"
                    className={classes.siteName}
                >
                    {SITE_NAME}
                </Typography>
            </div>
            <Search />
        </div>
    );
};

export default NavBar;
