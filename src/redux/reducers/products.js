import * as actionTypes from '../actions/actionTypes';

const initialState = {
    products: null,
    error: false,
    loading: false
}

const fetchProductsStart = (state, action) => {
    return {
        ...state,
        loading: true
    }
}
const fetchProductsSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        products: action.products
    }
}
const fetchProductsFalied = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCTS_START: return fetchProductsStart(state, action);
        case actionTypes.FETCH_PRODUCTS_SUCCESS: return fetchProductsSuccess(state, action);
        case actionTypes.FETCH_PRODUCTS_FALIED: return fetchProductsFalied(state, action);
        default: return state;
    }
}

export default reducer;