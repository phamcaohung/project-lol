import { CHANGE_ORDER_STATUS_FAILURE, CHANGE_ORDER_STATUS_REQUEST, CHANGE_ORDER_STATUS_SUCCESS, CONFIRMED_ORDERS_FAILURE, CONFIRMED_ORDERS_REQUEST, CONFIRMED_ORDERS_SUCCESS, DELETE_ORDERS_FAILURE, DELETE_ORDERS_REQUEST, DELETE_ORDERS_SUCCESS, DELIVERED_ORDERS_FAILURE, DELIVERED_ORDERS_REQUEST, DELIVERED_ORDERS_SUCCESS, GET_ALL_ORDERS_FAILURE, GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS, SHIP_ORDERS_FAILURE, SHIP_ORDERS_REQUEST, SHIP_ORDERS_SUCCESS } from "./ActionType"


const initialState = {
    adminOrder: null,
    error: null,
    loading: false,
    deleted: null,
    status: null,
    
}

// const adminOrderReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case GET_ORDERS_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             }
//         case GET_ORDERS_SUCCESS:
//             return {
//                 loading: false,
//                 orders: action.payload,
//                 error: "",
//             }
//         case GET_ORDERS_FAILURE:
//             return {
//                 loading: false,
//                 orders: [],
//                 error: action.payload
//             }
//         case CONFIRMED_ORDERS_REQUEST:
//         case PLACED_ORDERS_REQUEST:
//         case DELETE_ORDERS_REQUEST:
//         case CANCELED_ORDERS_REQUEST:
//             return {
//                 ...state,
//                 isLoading: true
//             }
//         case CONFIRMED_ORDERS_SUCCESS:
//             return {
//                 ...state,
//                 confirmed: action.payload,
//                 isLoading: false
//             }
//         case PLACED_ORDERS_SUCCESS:
//             return {
//                 ...state,
//                 placed: action.payload,
//                 isLoading: false
//             }
//         case DELIVERED_ORDERS_SUCCESS:
//             return {
//                 ...state,
//                 delivered: action.payload,
//                 isLoading: false
//             }
//         case CANCELED_ORDERS_SUCCESS:
//             return {
//                 ...state,
//                 canceled: action.payload,
//                 isLoading: false
//             }
//         case CONFIRMED_ORDERS_FAILURE:
//         case PLACED_ORDERS_FAILURE:
//         case DELIVERED_ORDERS_FAILURE:
//         case CANCELED_ORDERS_FAILURE:
//             return {
//                 ...state,
//                 error: action.payload,
//                 isLoading: false
//             }
//         case DELETE_ORDERS_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             }
//         case DELETE_ORDERS_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 deleteOrder: action.payload
//             }
//         case DELETE_ORDERS_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload
//             }
//         case SHIP_ORDERS_REQUEST:
//             return {
//                 ...state,
//                 isLoading: true,
//                 error: null
//             }
//         case SHIP_ORDERS_SUCCESS:
//             return {
//                 ...state,
//                 isLoading: false,
//                 shipped: action.payload
//             }
//         case SHIP_ORDERS_FAILURE:
//             return {
//                 ...state,
//                 isLoading: false,
//                 error: action.payload
//             }
//         default:
//             return state
//     }
// }

export const adminOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case GET_ALL_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                adminOrder: action.payload,
            }
        case GET_ALL_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const OrderStatusDeleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_ORDERS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case DELETE_ORDERS_SUCCESS:
            return {
                ...state,
                deleted: action.payload,
                isLoading: false
            }
        case DELETE_ORDERS_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        default:
            return state
    }
}

export const changeOrderStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_ORDER_STATUS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case CHANGE_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                status: action.payload,
                isLoading: false
            }
        case CHANGE_ORDER_STATUS_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        default:
            return state
    }
}
