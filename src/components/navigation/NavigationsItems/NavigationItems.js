import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';
import { FaShoppingCart } from 'react-icons/fa';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem exact link="/">Home</NavigationItem>
            {props.isAuthenticated ?
                <NavigationItem link="/logout">Logout</NavigationItem>
                : <NavigationItem exact link="/login">Login</NavigationItem>
            }
            <NavigationItem link="/orders">My Orders</NavigationItem>
            <NavigationItem link="/fashion">Fashion</NavigationItem>
            <NavigationItem link="/electronics">Electronics</NavigationItem>
            <NavigationItem link="/cart"> <FaShoppingCart size="1.5rem" /> </NavigationItem>
        </ul>
    );
};

export default navigationItems;