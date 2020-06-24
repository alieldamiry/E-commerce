import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orderedProducts: [],
    totalPrice: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            const orderedProduct = { ...action.product, quantity: 1 };
            if (!state.orderedProducts.some(el => el.name === orderedProduct.name)) {
                return {
                    ...state,
                    orderedProducts: state.orderedProducts.concat(orderedProduct),
                }
            } else {
                return state;
            }
        case actionTypes.CALCULATE_PRICE:
            const totalPrice = state.orderedProducts.reduce((prev, cur) => {
                return prev + cur.price * cur.quantity;
            }, 0);
            return { ...state, totalPrice: totalPrice }
        case actionTypes.DELETE_ITEM:
            let orderedProducts = [...state.orderedProducts];
            orderedProducts = orderedProducts.filter(el => el !== action.item);
            return {
                ...state,
                orderedProducts: orderedProducts
            }
        case actionTypes.CHANGE_QUANTITY:
            let products = [...state.orderedProducts];
            products.filter(el => el.name === action.item.name)[0].quantity = Number(action.event.target.value);
            return {
                ...state,
                orderedProducts: products
            }
        default: return state;
    }
}

export default reducer;