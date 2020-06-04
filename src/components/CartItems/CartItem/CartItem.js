import React, { Component } from 'react';
import { FaCheck } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import classes from './CartItem.css';


const CartItem = (props) => {
    let imageSource = require('../../../assets/images/products/' + props.CartItem.name + '.jpg');
    return (
        <div className={[classes.CartItem, classes.Container].join(' ')}>
            <div className={classes.ImageContainer}>
                <img alt={props.CartItem.name} className={classes.image} src={imageSource} />
            </div>
            <div className={classes.ProductName}>{props.CartItem.name}</div>
            <div className={classes.del} onClick={props.delete}>
                <RiDeleteBin5Line size="1.7rem" color="#F65A41" />
            </div>
            <div className={classes.LargerFont}><strong>{props.CartItem.quantity * props.CartItem.price}$</strong></div>
            <div className={classes.SmallerFont}> <FaCheck color="#2CCC7E" /> <strong>Free Shipping</strong></div>
            <div>Quantity:
                        <select
                    className={classes.Numbers}
                    value={props.CartItem.quantity}
                    onChange={(event) => props.changeQuantity(event)}>
                    {['1', '2', '3', '5', '6', '7', '8', '9', '10']
                        .map(el => <option key={el} value={el}>{el}</option>)}
                </select>
            </div>
        </div>
    );
};

export default CartItem;