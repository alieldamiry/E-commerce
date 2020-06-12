import React from 'react';
import classes from './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink exact={props.exact}
                activeClassName={classes.active}
                to={props.link}><strong>{props.children}</strong></NavLink>
            {/* href={props.link}>{props.children} */}
        </li>
    );
};

export default navigationItem;