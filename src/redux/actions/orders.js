import * as actionTypes from './actionTypes';
import axios from 'axios';

const purchaseProductsStart = () => {
    return {
        type: actionTypes.PURCHASE_PRODUCTS_START
    }
}

const purchaseProductsSuccess = () => {
    return {
        type: actionTypes.PURCHASE_PRODUCTS_SUCCESS
    }
}

const purchaseProductsFailed = error => {
    return {
        type: actionTypes.PURCHASE_PRODUCTS_FAILED
    }
}


export const purchaseProducts = (order) => {
    return (dispatch, getState) => {
        dispatch(purchaseProductsStart())
        axios.post('https://e-commerce-9417b.firebaseio.com/orders.json?auth=' + getState().auth.token, order)
            .then(response => {
                console.log(response.data);
                dispatch(purchaseProductsSuccess());
            }).catch(err => {
                console.log(err.response.data.error);
                dispatch(purchaseProductsFailed(err))
            })
    }
}

// Fetching Orders

const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

const fetchOrdersSuccess = (fetchedOrders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        fetchedOrders: fetchedOrders
    }
}

const fetchOrdersFailed = error => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}

export const fetchOrders = () => {
    return (dispatch, getState) => {
        dispatch(fetchOrdersStart())

        axios.get('https://e-commerce-9417b.firebaseio.com/orders.json?auth=' + getState().auth.token)
            .then(res => {
                // console.log(res.data);
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(error => {
                dispatch(fetchOrdersFailed(error))
            })
    }
}