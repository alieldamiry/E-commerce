import React from 'react';
import classes from './Toolbar.css';
import NavigationItems from '../NavigationsItems/NavigationItems';
import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked} />
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuth} />
            </nav>
            <div className={classes.Logo}>
                <Logo />
            </div>

        </header>
    );
}

export default toolbar;