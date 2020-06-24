import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Cart.css';
import CartItem from '../../components/CartItem/CartItem';
import PriceSummary from '../../components/PriceSummary/PriceSummary';
import * as actionCreators from '../../redux/actions/actionCreators';

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
        orderedProducts: state.orderedProducts,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteItem: (item) => {
            dispatch(actionCreators.deleteItem(item))
            dispatch(actionCreators.calculatePrice())
        },
        changeQuantity: (event, item) => {
            dispatch(actionCreators.changeQuantity(event, item))
            dispatch(actionCreators.calculatePrice())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);