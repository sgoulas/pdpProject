import React from 'react';
import { useRouter } from 'next/router';

import { Typography } from '@components';
import { SITE_NAME, landingPage } from '@core';

import useStyles from './SiteName.styles';

const SiteName: React.FC = () => {
    const classes = useStyles();
    const router = useRouter();

    const navigateToLandingPage = () => router.push(landingPage());

    return (
        <>
            <Typography
                component="h1"
                variant="h5"
                color="textSecondary"
                className={classes.siteNameMobile}
                onClick={navigateToLandingPage}
            >
                {SITE_NAME.charAt(0)}
            </Typography>
            <Typography
                component="h1"
                variant="h5"
                color="textSecondary"
                className={classes.siteName}
                onClick={navigateToLandingPage}
            >
                {SITE_NAME}
            </Typography>
        </>
    );
};

export default SiteName;
