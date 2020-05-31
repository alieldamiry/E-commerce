import React, { Component } from 'react';
import classes from './Cart.css';

class Cart extends Component {
    componentDidMount() {
        this.props.closeNotification();
    }

    render() {
        let orderedProducts = <div className={classes.cartEmpty}>
            <h2>Cart is empty!</h2>
            <p>You haven't ordered any items</p>
            <div className={classes.Btn}
                onClick={() => window.history.back()}>Continue shopping</div>
        </div>;
        if (this.props.products.length !== 0) {
            orderedProducts = this.props.products.map(product => <h1 key={product.name}>{product.name}</h1>);
        }
        return (
            <React.Fragment>
                
            </React.Fragment>
        );
    }
}

export default Cart;