import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import classes from './ProductDetails.css'

const ProductDetails = (props) => {
    return (
        <Aux>
            <Backdrop clicked={props.closeDetails} show={props.show} />
            <div className={classes.Details} style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
                <p><strong>{props.productName}</strong></p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.
                        </p>
            </div>
        </Aux>
    );
};

export default ProductDetails;