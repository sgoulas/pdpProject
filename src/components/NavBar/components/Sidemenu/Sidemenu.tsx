import React, { useState } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LanguageIcon from '@material-ui/icons/Language';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import PaymentIcon from '@material-ui/icons/Payment';

import { Typography } from '@components';

import useStyles from './Sidemenu.styles';

const Sidemenu: React.FC = () => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer =
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            setIsOpen(open);
        };

    const helpAndSettingsList = [
        {
            text: 'Language',
            icon: <LanguageIcon />,
        },
        {
            text: 'Account',
            icon: <AccountCircleIcon />,
        },
        {
            text: 'Payment Methods',
            icon: <PaymentIcon />,
        },
        {
            text: 'Contact Support',
            icon: <ContactSupportIcon />,
        },
    ];

    const MenuOptions = () => (
        <div
            className={[classes.list, classes.fullList].join(' ')}
            // role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <div className={classes.menuHeader}>
                <Typography variant="body1" color="textSecondary">
                    Hello, Sign in
                </Typography>
            </div>
            <List dense>
                <ListItem>
                    <Typography className={classes.menuTitle}>
                        Technology
                    </Typography>
                </ListItem>
                {['Smartphones', 'Laptops', 'Tablets', 'Gaming', 'Gadgets'].map(
                    text => (
                        <ListItem button key={text}>
                            <ListItemText
                                primary={text}
                                className={classes.menuItem}
                            />
                        </ListItem>
                    )
                )}
            </List>
            <Divider />
            <List dense>
                <ListItem>
                    <Typography className={classes.menuTitle}>
                        Help & Settings
                    </Typography>
                </ListItem>
                {helpAndSettingsList.map(({ text, icon }) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText
                            primary={text}
                            className={classes.menuItem}
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <>
                <Button onClick={toggleDrawer(true)}>toggle</Button>
                <SwipeableDrawer
                    anchor={'left'}
                    open={isOpen}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    <MenuOptions />
                </SwipeableDrawer>
            </>
        </div>
    );
};

export default Sidemenu;
