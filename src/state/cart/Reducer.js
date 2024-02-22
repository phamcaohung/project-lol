import { GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionType";

const initialState = {
    cart: null,
    loading: false,
    error: null,
    cartItems: [],
    deleteCartItem: null,
    updateCartItem: null,
}


export const getCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART_REQUEST:
            return {...state, loading: true, error: null};
        case GET_CART_SUCCESS:
            return {...state, cart: action.payload, loading: false}
        case GET_CART_FAILURE: 
            return {...state, error: action.payload, loading: false}
        default: 
            return state
    }
}

export const updateCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CART_ITEM_REQUEST:
            return {...state, loading: true, error: null}
        case UPDATE_CART_ITEM_SUCCESS:
            return {
                ...state, 
                updateCartItem: action.payload, 
                loading: false
            }
        case UPDATE_CART_ITEM_FAILURE:
            return {...state, error: action.payload, loading: false}
        default: 
            return state
    }
}

export const deleteCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case REMOVE_CART_ITEM_REQUEST:
            return {...state, loading: true, error: null}
        case REMOVE_CART_ITEM_SUCCESS:
            return {
                ...state, 
                deleteCartItem: action.payload, 
                loading: false
            }
        case REMOVE_CART_ITEM_FAILURE:
            return {...state, error: action.payload, loading: false}
        default: 
            return state
    }
}