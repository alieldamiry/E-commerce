import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orderedProducts: [],
    totalPrice: 0,
}

const addToCart = (state, action) => {
    const orderedProduct = { ...action.product, quantity: 1 };
    if (!state.orderedProducts.some(el => el.name === orderedProduct.name)) {
        return {
            ...state,
            orderedProducts: state.orderedProducts.concat(orderedProduct),
        }
    } else {
        return state;
    }
}

const calculatePrice = (state, action) => {
    const totalPrice = state.orderedProducts.reduce((prev, cur) => {
        return prev + cur.price * cur.quantity;
    }, 0);
    return { ...state, totalPrice: totalPrice }
}

const deleteItem = (state, action) => {
    let orderedProducts = [...state.orderedProducts];
    orderedProducts = orderedProducts.filter(el => el !== action.item);
    return {
        ...state,
        orderedProducts: orderedProducts
    }
}

const changeQuantity = (state, action) => {
    let products = [...state.orderedProducts];
    products.filter(el => el.name === action.item.name)[0].quantity = Number(action.event.target.value);
    return {
        ...state,
        orderedProducts: products
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART: return addToCart(state, action);
        case actionTypes.CALCULATE_PRICE: return calculatePrice(state, action);
        case actionTypes.DELETE_ITEM: return deleteItem(state, action)
        case actionTypes.CHANGE_QUANTITY: return changeQuantity(state, action)
        default: return state;
    }
}

export default reducer;