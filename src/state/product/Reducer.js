import { DELETE_PRODUCT_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCT_FAILURE, FIND_PRODUCT_REQUEST, FIND_PRODUCT_SUCCESS, FIND_PRODUCT_BY_SERIES_REQUEST, FIND_PRODUCT_BY_SERIES_SUCCESS, FIND_PRODUCT_BY_SERIES_FAILURE, FIND_CAROUSEL_PRODUCT_BY_SERIES_REQUEST, FIND_CAROUSEL_PRODUCT_BY_SERIES_SUCCESS, FIND_CAROUSEL_PRODUCT_BY_SERIES_FAILURE, GET_ALL_SERIES_REQUEST, GET_ALL_SERIES_SUCCESS, GET_ALL_SERIES_FAILURE } from "./ActionType";

const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null,
    deletedProduct: null,
    productSeries: [],
    productCarousel: [],
    series: []
}

// export const customerProductReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case FIND_PRODUCT_REQUEST:
//         case FIND_PRODUCT_BY_ID_REQUEST:
//             return {...state, loading: true, error: null}
//         case FIND_PRODUCT_SUCCESS:
//             return {...state, loading: false, error: null, products: action.payload}
//         case FIND_PRODUCT_BY_ID_SUCCESS:
//             return {...state, loading: false, error: null, product: action.payload}
//         case DELETE_PRODUCT_SUCCESS:
//             return {
//                 ...state, 
//                 loading: false, 
//                 error: null, 
//                 deletedProduct: action.payload
//             }
//         case FIND_PRODUCT_FAILURE:
//         case FIND_PRODUCT_BY_ID_FAILURE:
//             return {...state, loading: false, error: action.payload}
//         default:
//             return state;
//     }
// }

export const productListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_PRODUCT_REQUEST:
            return {...state, loading: true, error: null}
        case FIND_PRODUCT_SUCCESS:
            return {...state, loading: false, error: null, products: action.payload, product: null}
        case FIND_PRODUCT_FAILURE:
            return {...state, loading: false, error: action.payload}
        case DELETE_PRODUCT_SUCCESS:
            return {
                    ...state, 
                    loading: false, 
                    error: null, 
                    deletedProduct: action.payload
                }
        default:
            return state;
    }
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_PRODUCT_BY_ID_REQUEST:
            return {...state, loading: true, error: null}
        case FIND_PRODUCT_BY_ID_SUCCESS:
            return {...state, loading: false, error: null, product: action.payload}
        case FIND_PRODUCT_BY_ID_FAILURE:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}

export const productSeriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_PRODUCT_BY_SERIES_REQUEST:
            return {...state, loading: true, error: null}
        case FIND_PRODUCT_BY_SERIES_SUCCESS:
            return {...state, loading: false, error: null, productSeries: action.payload}
        case FIND_PRODUCT_BY_SERIES_FAILURE:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}


export const carouselProductSeriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_CAROUSEL_PRODUCT_BY_SERIES_REQUEST:
            return {...state, loading: true, error: null}
        case FIND_CAROUSEL_PRODUCT_BY_SERIES_SUCCESS:
            return {...state, loading: false, error: null, productCarousel: action.payload}
        case FIND_CAROUSEL_PRODUCT_BY_SERIES_FAILURE:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}

export const getAllSeriesNameReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SERIES_REQUEST:
            return {...state, loading: true, error: null}
        case GET_ALL_SERIES_SUCCESS:
            return {...state, loading: false, error: null, series: action.payload}
        case GET_ALL_SERIES_FAILURE:
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}