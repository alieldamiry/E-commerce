import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './PriceSummary.css';
import { withRouter } from "react-router";
import * as actions from '../../redux/actions/auth';

class PriceSummary extends Component {
    pathHandler = () => {
        let path = '/checkout'
        if (!this.props.isAuthenticated) {
            path = '/auth';
            this.props.setAuthRedirectPath('/checkout')
        }
        this.props.history.push(path);
    }
    render() {

        return (
            <div className={classes.PriceSummary}>
                <div className={classes.SummaryDiv}><strong>Subtotal</strong></div>
                <div className={classes.SummaryDiv}>{this.props.totalPrice} $</div>
                <div className={classes.SummaryDiv}><strong>Tax (10%)</strong></div>
                <div className={classes.SummaryDiv}>{(.1 * this.props.totalPrice).toFixed(2)} $</div>
                <div className={classes.SummaryDiv}><strong>Total</strong></div>
                <div className={classes.SummaryDiv}>{(.1 * this.props.totalPrice + this.props.totalPrice).toFixed(2)} $</div>
                <button className={classes.ProceedToCheckout}
                    onClick={this.pathHandler}>
                    {this.props.isAuthenticated ? 'Proceed to Checkout' : 'Sign in to Continue'}
                </button>

            </div>
        );
    }
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