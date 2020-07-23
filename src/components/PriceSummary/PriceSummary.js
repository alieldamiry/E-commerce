import React from 'react';
import { connect } from 'react-redux';
import classes from './PriceSummary.css';
import { withRouter } from "react-router";
import * as actions from '../../redux/actions/auth';

const PriceSummary = props => {

    const pathHandler = () => {
        let path = '/checkout'
        if (!props.isAuthenticated) {
            path = '/auth';
            props.setAuthRedirectPath('/checkout')
        }
        props.history.push(path);
    }
    return (
        <div className={classes.PriceSummary}>
            <div className={classes.SummaryDiv}><strong>Subtotal</strong></div>
            <div className={classes.SummaryDiv}>{props.totalPrice} $</div>
            <div className={classes.SummaryDiv}><strong>Tax (10%)</strong></div>
            <div className={classes.SummaryDiv}>{(.1 * props.totalPrice).toFixed(2)} $</div>
            <div className={classes.SummaryDiv}><strong>Total</strong></div>
            <div className={classes.SummaryDiv}>{(.1 * props.totalPrice + props.totalPrice).toFixed(2)} $</div>
            <button className={classes.ProceedToCheckout}
                onClick={pathHandler}>
                {props.isAuthenticated ? 'Proceed to Checkout' : 'Sign in to Continue'}
            </button>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        setAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PriceSummary));