import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ADDRESS_BY_ID_FAILURE, DELETE_ADDRESS_BY_ID_REQUEST, DELETE_ADDRESS_BY_ID_SUCCESS, GET_ADDRESS_BY_USER_FAILURE, GET_ADDRESS_BY_USER_REQUEST, GET_ADDRESS_BY_USER_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_ORDER_HISTORY_FAILURE, GET_ORDER_HISTORY_REQUEST, GET_ORDER_HISTORY_SUCCESS } from "./ActionType";

const initialState = {
    order: null,
    orderHistory: null,
    error: null,
    loading: false,
    address: null,
    deletedAddress: null
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_BY_ID_REQUEST: 
            return {
                ...state,
                loading: true,
                error: null
            }
        case GET_ORDER_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                order: action.payload
            }
        case GET_ORDER_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const createOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                order: action.payload,
                error: null
            }
        case CREATE_ORDER_FAILURE:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}

export const getOrderHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_HISTORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case GET_ORDER_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                orderHistory: action.payload
            }
        case GET_ORDER_HISTORY_FAILURE:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}

export const deleteAddressReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_ADDRESS_BY_ID_REQUEST:
            return {...state, loading: true, error: null}
        case DELETE_ADDRESS_BY_ID_SUCCESS:
            return {
                    ...state, 
                    loading: false, 
                    error: null, 
                    deletedAddress: action.payload
                }
        case DELETE_ADDRESS_BY_ID_FAILURE:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}

export const getAddressReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ADDRESS_BY_USER_REQUEST:
            return {...state, loading: true, error: null}
        case GET_ADDRESS_BY_USER_SUCCESS:
            return {
                    ...state, 
                    loading: false, 
                    error: null, 
                    address: action.payload
                }
        case GET_ADDRESS_BY_USER_FAILURE:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}

