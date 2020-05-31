import React, { Component } from 'react';
import classes from './Cart.css';

class Cart extends Component {
    componentDidMount() {
        console.log(this.props);
        this.props.closeNotification();
    }

    render() {
        console.log(this.props.products);
        const products = this.props.products.map(product => <h1>{product.name}</h1>)
        return (
            <div>
                <div className={classes.m}>
                    <h1>Cart is empty!</h1>
                    <p>You haven't ordered any item</p>
                </div>
            </div>
        );
    }
}

export default Cart;