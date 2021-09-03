import React from 'react';

import { Typography } from '@components';

import useStyles from './Copyright.styles';

const Copyright: React.FC = () => {
    const classes = useStyles();

    return (
        <Typography
            variant="caption"
            component="p"
            color="textSecondary"
            align="right"
            className={classes.text}
        >
            made by Spyros Goulas
        </Typography>
    );
};

export default Copyright;
