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
    return dispatch => {
        dispatch(purchaseProductsStart())
        console.log(order);
        axios.post('https://e-commerce-9417b.firebaseio.com/orders.json', order)
            .then(response => {
                console.log(response);
                dispatch(purchaseProductsSuccess());
            }).catch(error => {
                dispatch(purchaseProductsFailed(error))
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
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get('https://e-commerce-9417b.firebaseio.com/orders.json')
            .then(response => {
                // console.log(response);
                dispatch(fetchOrdersSuccess(response.data));
            }).catch(error => {
                dispatch(fetchOrdersFailed(error))
            })
    }
}