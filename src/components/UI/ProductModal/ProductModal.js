import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './ProductModal.css'

const ProductModal = (props) => {
    return (
        <React.Fragment>
            <Backdrop clicked={props.closeProductModal} show={props.show} />
            <div className={classes.ProductModal} style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
                <p><strong>{props.product.name}</strong></p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.
                        </p>
            </div>
        </React.Fragment>
    );
};

export default ProductModal;