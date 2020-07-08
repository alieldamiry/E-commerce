import * as actionTypes from '../actions/actionTypes';

const initialState = {
    fetchedOrders: null,
    loading: false,
    error: null
}

const purchaseProductsStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error:null
    }
}

const purchaseProductsSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        
    }
}

const purchaseProductsFailed = (state, action) => {
    console.log(action.error);
    
    return {
        ...state,
        loading: false,
        error: action.error
    }
}

// Fetching Orders
const fetchOrdersStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error:null
    }
}

const fetchOrdersSuccess = (state, action) => {
    let updatedOrders = Object.values(action.fetchedOrders);
    return {
        ...state,
        loading: false,
        fetchedOrders: updatedOrders
    }
}

const fetchOrdersFailed = (state, action) => {
    return {
        ...state,
        loading: true,
        error: action.error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_PRODUCTS_START: return purchaseProductsStart(state, action);
        case actionTypes.PURCHASE_PRODUCTS_SUCCESS: return purchaseProductsSuccess(state, action);
        case actionTypes.PURCHASE_PRODUCTS_FAILED: return purchaseProductsFailed(state, action);

        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAILED: return fetchOrdersFailed(state, action);
        default: return state;
    }
}

export default reducer;