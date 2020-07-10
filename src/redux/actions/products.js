import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const fetchProductsStart = () => {
    return {
        type: actionTypes.FETCH_PRODUCTS_START
    }
}

const fetchProductsSuccess = products => {
    return {
        type: actionTypes.FETCH_PRODUCTS_SUCCESS,
        products: products
    }
}

const fetchProductsFalied = error => {
    return {
        type: actionTypes.FETCH_PRODUCTS_FALIED,
        error: error
    }
}


export const fetchProducts = (Category) => {
    return dispatch => {
        dispatch(fetchProductsStart())
        axios.get('/products/' + Category + '.json')
            .then(res => {
                dispatch(fetchProductsSuccess(Object.values(res.data)));
            }).catch(error => {
                dispatch(fetchProductsFalied(error))
            })
    }
}