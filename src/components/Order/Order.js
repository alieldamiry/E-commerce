import React from 'react';
import classes from './Order.css';

const Order = (props) => {
    console.log(props.order);
    let productsOutput = props.order.products.map(p =>
        <span className={classes.Product}>{p.name}({p.quantity}) </span>)
    return (
        <div className={classes.Order}>
            <p>Ordered Items: {productsOutput} </p>
            <p>total Price: <strong>USD {props.order.totalPrice}</strong></p>
        </div>
    );
};

export default Order;