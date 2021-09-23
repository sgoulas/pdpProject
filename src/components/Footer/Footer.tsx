import React from 'react';

import { Typography, Divider } from '@components';
import {
    DEV_PROFILE_URL,
    GIT_PROFILE_URL,
    GIT_REPO_URL,
    LINKEDIN_PROFILE_URL,
    STACK_OVERFLOW_PROFILE_URL,
} from '@core';

import useStyles from './Footer.styles';
import { LinkExternal, Copyright } from './components';

const Footer: React.FC = () => {
    const classes = useStyles();

    return (
        <article>
            <footer className={classes.footer}>
                <div className={classes.container}>
                    <div className={classes.containerItem}>
                        <Typography
                            component="h5"
                            variant="body1"
                            className={classes.section}
                        >
                            Social
                        </Typography>
                        <LinkExternal
                            url={LINKEDIN_PROFILE_URL}
                            text="linkedIn"
                        />
                        <LinkExternal
                            url={STACK_OVERFLOW_PROFILE_URL}
                            text="stack overflow"
                        />
                        <LinkExternal url={DEV_PROFILE_URL} text="DEV.to" />
                    </div>
                    <div className={classes.containerItem}>
                        <Typography
                            component="h5"
                            variant="body1"
                            className={classes.section}
                        >
                            FAQ
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            about this project
                        </Typography>
                    </div>
                    <div className={classes.containerItem}>
                        <Typography
                            component="h5"
                            variant="body1"
                            className={classes.section}
                        >
                            github
                        </Typography>
                        <LinkExternal
                            url={GIT_REPO_URL}
                            text="project repository"
                        />
                        <LinkExternal
                            url={GIT_PROFILE_URL}
                            text="github profile"
                        />
                    </div>
                </div>
                <Divider variant="middle" />
                <Copyright />
            </footer>
        </article>
    );
};

export default Footer;
