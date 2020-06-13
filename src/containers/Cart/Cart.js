import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './Cart.css';
import CartItem from '../../components/CartItem/CartItem';

class Cart extends Component {
    state = {
        quantity: 1
    }
    componentDidUpdate(prevProps) {
        this.props.calculateTotalPrice();
    }
    componentDidMount() {
        this.props.closeNotification();
    }
    render() {

        let orderedProducts = <div className={classes.CartEmpty}>
            <h2>Cart is empty!</h2>
            <p>You haven't ordered any items</p>
            <div className={classes.Btn}
                onClick={() => window.history.back()}>Continue shopping</div>
        </div>;

        if (this.props.products.length !== 0) {
            orderedProducts = <div className={classes.MainContainer}>
                    {this.props.products.map(item =>
                        <CartItem
                            changeQuantity={(event) => this.props.changeQuantity(event, item)}
                            CartItem={item} key={item.name}
                            delete={() => this.props.deleteItem(item)}
                        />)}
                <div className={[classes.Container, classes.SummaryContainer].join(' ')}>
                    <div className={classes.CartSummary}>
                        <div className={classes.SummaryDiv}><strong>Subtotal</strong></div>
                        <div className={classes.SummaryDiv}>{this.props.totalPrice.toFixed(2)} $</div>
                        <div className={classes.SummaryDiv}><strong>Tax (10%)</strong></div>
                        <div className={classes.SummaryDiv}>{(.1 * this.props.totalPrice).toFixed(2)} $</div>
                        <div className={classes.SummaryDiv}><strong>Total</strong></div>
                        <div className={classes.SummaryDiv}>{(.1 * this.props.totalPrice + this.props.totalPrice).toFixed(2)} $</div>
                    </div>
                    <div className={classes.ProceedToCheckout}><Link to="/checkout" >Proceed to Checkout</Link></div>
                </div>
            </div>;
        }
        return (
            <React.Fragment>
                {orderedProducts}
            </React.Fragment >
        );
    }
}

export default Cart;