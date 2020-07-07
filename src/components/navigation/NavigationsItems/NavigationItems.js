import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';
import { FaShoppingCart } from 'react-icons/fa';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem exact link="/">Home</NavigationItem>
            <NavigationItem link="/fashion">Fashion</NavigationItem>
            <NavigationItem link="/electronics">Electronics</NavigationItem>
            {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
            {props.isAuthenticated ?
                <NavigationItem link="/logout">Logout</NavigationItem>
                : <NavigationItem link="/auth">Login</NavigationItem>}
            <NavigationItem link="/cart"> <FaShoppingCart size="1.5rem" /> </NavigationItem>
        </ul>
    );
};

export default navigationItems;