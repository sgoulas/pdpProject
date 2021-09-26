import React from 'react';
import Link from 'next/link';

import { Typography } from '@components';
import { SITE_NAME, landingPage } from '@core';

import useStyles from './SiteName.styles';

const SiteName: React.FC = () => {
    const classes = useStyles();

    return (
        <>
            <Link href={landingPage()}>
                <Typography
                    component="h1"
                    variant="h5"
                    color="textSecondary"
                    className={classes.siteNameMobile}
                >
                    {SITE_NAME.charAt(0)}
                </Typography>
            </Link>
            <Link href={landingPage()}>
                <Typography
                    component="h1"
                    variant="h5"
                    color="textSecondary"
                    className={classes.siteName}
                >
                    {SITE_NAME}
                </Typography>
            </Link>
        </>
    );
};

export default SiteName;
