import React from 'react';
import classes from './CartNotification.css';
import { NavLink } from 'react-router-dom';

const CartNotification = (props) => {
    console.log(props.notificationState);

    return (
        <div className={classes.CartNotification}
            style={{
                transform: props.notificationState ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.notificationState ? '1' : '0'
            }}>
            <h4>Successfully Added to Cart</h4>
            <div className={classes.Btns} >
                <NavLink to="/cart" className={[classes.Btn, classes.greenBtn].join(' ')}>Open Cart</NavLink>
                <div className={classes.Btn} onClick={props.closeNotification}>Continue Shopping</div>
            </div>
        </div>
    );
};

export default CartNotification;