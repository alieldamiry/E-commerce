import * as actionTypes from './actionTypes';

export const addToCart = (product) => {
    return {
        type: actionTypes.ADD_TO_CART,
        product: product,
    }
}

export const calculatePrice = () => {
    return {
        type: actionTypes.CALCULATE_PRICE
    }
}

export const deleteItem = (item) => {
    return {
        type: actionTypes.DELETE_ITEM,
        item: item
    }
}

export const changeQuantity = (event, item) => {
    return {
        type:actionTypes.CHANGE_QUANTITY,
        event:event,
        item:item
    }
}