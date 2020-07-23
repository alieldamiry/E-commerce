import React, { useEffect } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { fetchOrders } from '../../redux/actions/orders'
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
const Orders = props => {
    useEffect(() => {
        props.fetchOrders();
    }, []);

    let orders = <Spinner />
    if (props.error) {
        orders = <p>Can't load Orders</p>
    }

    if (props.fetchedOrders && !props.loading) {
        let updatedOrders = props.fetchedOrders.map(el => {
            return {
                products: Object.values(el.orderedProducts),
                totalPrice: el.totalPrice,
                key: el.id
            }
        })
        orders = updatedOrders.map(p => <Order key={p.key} order={p} />);
    }
    return (
        <div>
            {orders}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        fetchedOrders: state.orders.fetchedOrders,
        loading: state.orders.loading,
        error: state.orders.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));