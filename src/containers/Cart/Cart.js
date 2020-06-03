import React, { Component } from 'react';
import classes from './Cart.css';
import CartItems from '../../components/CartItems/CartItems';
import CartItem from '../../components/CartItems/CartItem/CartItem';


class Cart extends Component {
    state = {
        quantity: 1
    }
    componentDidMount() {
        this.props.closeNotification();
    }
    render() {
        let totalPrice = this.props.products.reduce((prev, cur) => {
            return prev + cur.price * cur.quantity;
        }, 0);

        let orderedProducts = <div className={classes.CartEmpty}>
            <h2>Cart is empty!</h2>
            <p>You haven't ordered any items</p>
            <div className={classes.Btn}
                onClick={() => window.history.back()}>Continue shopping</div>
        </div>;

        if (this.props.products.length !== 0) {
            orderedProducts = <div className={classes.MainContainer}>
                <CartItems>
                    {this.props.products.map(item =>
                        <CartItem
                            changeQuantity={(event) => this.props.changeQuantity(event, item)}
                            CartItem={item} key={item.name}
                            delete={() => this.props.deleteItem(item)}
                        />)}
                </CartItems>
                <div className={[classes.Container, classes.SummaryContainer].join(' ')}>
                    <div className={classes.CartSummary}>
                        <div className={classes.SummaryDiv}><strong>Subtotal</strong></div>
                        <div className={classes.SummaryDiv}>{totalPrice.toFixed(2)} $</div>
                        <div className={classes.SummaryDiv}><strong>Tax (10%)</strong></div>
                        <div className={classes.SummaryDiv}>{(.1 * totalPrice).toFixed(2)} $</div>
                        <div className={classes.SummaryDiv}><strong>Total</strong></div>
                        <div className={classes.SummaryDiv}>{(.1 * totalPrice + totalPrice).toFixed(2)} $</div>
                    </div>
                    <div className={classes.Checkout}>Proceed to Checkout</div>
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