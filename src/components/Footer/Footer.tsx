import React from 'react';

import { Typography } from 'components';

import useStyles from './Footer.styles';

const Footer: React.FC = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Typography variant="body2">footer element</Typography>
        </footer>
    );
};

export default Footer;
