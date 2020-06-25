import React from 'react';
import classes from './Product.css';
import { FaCartPlus } from "react-icons/fa";
import { BsInfoSquareFill } from "react-icons/bs";

const Product = (props) => {

    let imageSource = require('../../assets/images/products/' + props.product.name + '.jpg')
    return (
        <div className={classes.Product}>

            <img className={classes.img} src={imageSource} alt={props.product.name} />
            <div className={classes.naming}>
                <p>{props.product.name}</p>
                <p><strong>{props.product.price}$</strong></p>
            </div>
            <div className={classes.Overlay}>
                <div className={classes.iconsContainer}>
                    <FaCartPlus className={classes.icon}
                        onClick={props.addToCart}
                        color="white" size="4.5rem" />
                    <BsInfoSquareFill className={classes.icon}
                        onClick={props.productModalClicked}
                        color="white" size="4.4rem" />
                </div>
            </div>
        </div>
    );
};

export default Product;