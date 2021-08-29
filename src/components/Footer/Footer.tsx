import React from 'react';
import Link from '@material-ui/core/Link';

import { Typography } from 'components';

import useStyles from './Footer.styles';

const Footer: React.FC = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <div className={classes.container}>
                <div className={classes.containerItem}>
                    <Typography component="h4" variant="h6">
                        Contact
                    </Typography>
                    <Typography variant="body1">word</Typography>
                    <Typography variant="body1">word</Typography>
                    <Typography variant="body1">word</Typography>
                    <Typography variant="body1">word</Typography>
                    <Typography variant="body1">word</Typography>
                </div>
                <div className={classes.containerItem}>
                    <Typography component="h4" variant="h6">
                        FAQ
                    </Typography>
                    <Typography variant="body1">word</Typography>
                </div>
                <div className={classes.containerItem}>
                    <Typography component="h4" variant="h6">
                        Git Repo
                    </Typography>
                    <Link
                        href="https://github.com/sgoulas/pdpProject"
                        rel="noopener"
                        target="_blank"
                        underline="none"
                    >
                        <Typography variant="body1">link</Typography>
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
