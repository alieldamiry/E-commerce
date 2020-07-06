import React, { Component } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import { fetchOrders } from '../../redux/actions/orders'
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrders();
    }
    render() {
        let orders = <Spinner />
        if (this.props.error) {
            orders = <p>Can't load Orders</p>
        }
        if (this.props.fetchedOrders && !this.props.loading) {

            let updatedOrders = this.props.fetchedOrders.map(el => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Orders);