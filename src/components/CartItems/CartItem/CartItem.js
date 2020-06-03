import React, { Component } from 'react';
import { FaCheck } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import classes from './CartItem.css';


class CartItem extends Component {
    componentDidMount() {
        console.log(this.props.CartItem.quantity);

    }

    render() {
        let imageSource = require('../../../assets/images/products/' + this.props.CartItem.name + '.jpg');
        return (
            <div className={[classes.CartItem, classes.Container].join(' ')}>
                <div className={classes.ImageContainer}>
                    <img alt={this.props.CartItem.name} className={classes.image} src={imageSource} />
                </div>
                <div className={classes.ProductName}>{this.props.CartItem.name}</div>
                <div className={classes.del} onClick={this.props.delete}>
                    <RiDeleteBin5Line size="1.7rem" color="#F65A41" />
                </div>
                <div className={classes.LargerFont}><strong>{this.props.CartItem.quantity * this.props.CartItem.price}$</strong></div>
                <div className={classes.SmallerFont}> <FaCheck color="#2CCC7E" /> <strong>Free Shipping</strong></div>
                <div>Quantity:
                        <select
                        className={classes.Numbers}
                        value={this.props.CartItem.quantity}
                        onChange={(event) => this.props.changeQuantity(event)}>
                        {['1', '2', '3', '5', '6', '7', '8', '9', '10']
                            .map(el => <option key={el} value={el}>{el}</option>)}
                    </select>
                </div>
            </div>
        );
    }
};

export default CartItem;