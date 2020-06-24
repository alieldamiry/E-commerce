import React from 'react';
import classes from './PriceSummary.css';
import { Link } from 'react-router-dom';

const PriceSummary = (props) => {
    return (
        <div className={classes.PriceSummary}>
            <div className={classes.SummaryDiv}><strong>Subtotal</strong></div>
            <div className={classes.SummaryDiv}>{props.totalPrice} $</div>
            <div className={classes.SummaryDiv}><strong>Tax (10%)</strong></div>
            <div className={classes.SummaryDiv}>{(.1 * props.totalPrice).toFixed(2)} $</div>
            <div className={classes.SummaryDiv}><strong>Total</strong></div>
            <div className={classes.SummaryDiv}>{(.1 * props.totalPrice + props.totalPrice).toFixed(2)} $</div>
            <Link className={classes.ProceedToCheckout} to="/checkout" ><div >Proceed to Checkout</div></Link>
        </div>
    );
};

export default PriceSummary;