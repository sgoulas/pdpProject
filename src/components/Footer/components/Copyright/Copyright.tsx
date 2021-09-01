import React from 'react';

import { Typography } from '@components';

import useStyles from './Copyright.styles';

const Copyright: React.FC = () => {
    const classes = useStyles();

    return (
        <Typography variant="body2" align="right" className={classes.text}>
            made by Spyridon Goulas
        </Typography>
    );
};

export default Copyright;
