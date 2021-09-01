import React from 'react';

import { Typography } from '@components';

import useStyles from './Footer.styles';
import { LinkExternal, Copyright } from './components';

const Footer: React.FC = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <div className={classes.container}>
                <div className={classes.containerItem}>
                    <Typography component="h4" variant="h6">
                        Social
                    </Typography>
                    <LinkExternal
                        url="https://www.linkedin.com/in/spyros-goulas/"
                        text="linkedIn"
                    />
                    <LinkExternal
                        url="https://stackoverflow.com/users/6950690/%ce%a3%cf%80%cf%8d%cf%81%ce%bf%cf%82-%ce%93%ce%bf%cf%8d%ce%bb%ce%b1%cf%82"
                        text="stack overflow"
                    />
                    <LinkExternal url="https://dev.to/sgoulas" text="DEV.to" />
                </div>
                <div className={classes.containerItem}>
                    <Typography component="h4" variant="h6">
                        FAQ
                    </Typography>
                    <Typography variant="body1">about this project</Typography>
                </div>
                <div className={classes.containerItem}>
                    <Typography component="h4" variant="h6">
                        github
                    </Typography>
                    <LinkExternal
                        url="https://github.com/sgoulas/pdpProject"
                        text="project repository"
                    />
                    <LinkExternal
                        url="https://github.com/sgoulas"
                        text="github profile"
                    />
                </div>
            </div>
            <Copyright />
        </footer>
    );
};

export default Footer;
