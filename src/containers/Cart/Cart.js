import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Cart.css';
import CartItem from '../../components/CartItem/CartItem';
import PriceSummary from '../../components/PriceSummary/PriceSummary';
import * as actions from '../../redux/actions/cart';

class Cart extends Component {
    render() {
        let orderedProducts = <div className={classes.CartEmpty}>
            <h2>Cart is empty!</h2>
            <p>You haven't ordered any items</p>
            <div className={classes.Btn}
                onClick={() => window.history.back()}>Continue shopping</div>
        </div>;

        if (this.props.orderedProducts.length !== 0) {
            orderedProducts = <div className={classes.MainContainer}>
                {this.props.orderedProducts.map(item =>
                    <CartItem
                        changeQuantity={(event) => this.props.changeQuantity(event, item)}
                        CartItem={item} key={item.name}
                        delete={() => this.props.deleteItem(item)}
                    />)}
                <div className={[classes.Container, classes.SummaryContainer].join(' ')}>
                    <PriceSummary totalPrice={this.props.totalPrice} />
                </div>
            </div >;
        }
        return (
            <React.Fragment>
                {orderedProducts}
            </React.Fragment >
        );
    }
}

const mapStateToProps = state => {
    return {
        orderedProducts: state.cart.orderedProducts,
        totalPrice: state.cart.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteItem: (item) => {
            dispatch(actions.deleteItem(item))
            dispatch(actions.calculatePrice())
        },
        changeQuantity: (event, item) => {
            dispatch(actions.changeQuantity(event, item))
            dispatch(actions.calculatePrice())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);