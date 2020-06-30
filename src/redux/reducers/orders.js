import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: false
}

const purchaseProductsStart = (state, action) => {
    return {
        ...state,
        loading: true
    }
}

const purchaseProductsSuccess = (state, action) => {
    return {
        ...state,
        loading: false
    }
}

const purchaseProductsFailed = (state, action) => {
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
        default: return state;
    }
}

export default reducer;