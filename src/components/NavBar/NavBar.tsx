import React from 'react';

import { Typography } from '@components';

import useStyles from './NavBar.styles';

const NavBar: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.navBar}>
            <Typography component="h1" variant="h4" color="textSecondary">
                nav bar element
            </Typography>
        </div>
    );
};

export default NavBar;
