import * as actionTypes from './actionTypes';
import axios from 'axios';

const purchaseProductsStart = () => {
    return {
        type: actionTypes.PURCHASE_PRODUCTS_START,
        loading: true
    }
}

const purchaseProductsSuccess = () => {
    return {
        type: actionTypes.PURCHASE_PRODUCTS_SUCCESS,
        loading: false
    }
}

const purchaseProductsFailed = error => {
    return {
        type: actionTypes.PURCHASE_PRODUCTS_FAILED,
        error: error,
        loading: false
    }
}


export const purchaseProducts = (order) => {
    return dispatch => {
        dispatch(purchaseProductsStart())
        axios.get('https://e-commerce-9417b.firebaseio.com/orders.json', order)
            .then(response => {
                console.log(response);
                dispatch(purchaseProductsSuccess());
            }).catch(error => {
                dispatch(purchaseProductsFailed(error))
            })
    }
}