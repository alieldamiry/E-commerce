import React from 'react';
import classes from './Order.css';

const Order = (props) => {
    let productsOutput = props.order.products.map(p =>
        <span className={classes.Product} key={p.name}>{p.name}({p.quantity}) </span>)
    return (
        <div className={classes.Order}>
            <p>Ordered Items: {productsOutput} </p>
            <p>total Price: <strong>USD {props.order.totalPrice}</strong></p>
        </div>
    );
};

export default Order;