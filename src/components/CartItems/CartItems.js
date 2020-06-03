import React from 'react';
import classes from './CartItems.css';

const CartItems = (props) => {
    return (
        <div className={classes.CartItems}>
            {props.children}
        </div>
    );
};

export default CartItems;