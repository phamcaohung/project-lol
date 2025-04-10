import { DELETE_PRODUCT_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCT_FAILURE, FIND_PRODUCT_REQUEST, FIND_PRODUCT_SUCCESS, FIND_PRODUCT_BY_SERIES_REQUEST, FIND_PRODUCT_BY_SERIES_SUCCESS, FIND_PRODUCT_BY_SERIES_FAILURE, FIND_CAROUSEL_PRODUCT_BY_SERIES_REQUEST, FIND_CAROUSEL_PRODUCT_BY_SERIES_SUCCESS, FIND_CAROUSEL_PRODUCT_BY_SERIES_FAILURE, GET_ALL_SERIES_REQUEST, GET_ALL_SERIES_SUCCESS, GET_ALL_SERIES_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_FAILURE, FIND_NEW_PRODUCT_REQUEST, FIND_NEW_PRODUCT_SUCCESS, FIND_NEW_PRODUCT_FAILURE, UPDATE_PRODUCT_SUCCESS, FIND_PRODUCT_BY_CHAMPION_REQUEST, FIND_PRODUCT_BY_CHAMPION_SUCCESS, FIND_PRODUCT_BY_CHAMPION_FAILURE, FIND_PRODUCT_BY_REGION_REQUEST, FIND_PRODUCT_BY_REGION_SUCCESS, FIND_PRODUCT_BY_REGION_FAILURE, GET_ALL_SERIES_SKIN_REQUEST, GET_ALL_SERIES_SKIN_SUCCESS, GET_ALL_SERIES_SKIN_FAILURE } from "./ActionType";

const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null,
    deletedProduct: null,
    productSeries: [],
    productCarousel: [],
    series: [],
    newProducts: [],
}

export const productListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_PRODUCT_REQUEST:
            return { ...state, loading: true, error: null }
        case FIND_PRODUCT_SUCCESS:
            return { ...state, loading: false, error: null, products: action.payload }
        case FIND_PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

export const deleteProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
            return { ...state, loading: true, error: null }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                deletedProduct: action.payload,
                loading: false
            }
        case DELETE_PRODUCT_FAILURE:
            return { ...state, error: action.payload, loading: false }
        default:
            return state
    }
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_PRODUCT_BY_ID_REQUEST:
            return { ...state, loading: true, error: null }
        case FIND_PRODUCT_BY_ID_SUCCESS:
            return { ...state, loading: false, error: null, product: action.payload }
        case FIND_PRODUCT_BY_ID_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

export const productSeriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_PRODUCT_BY_SERIES_REQUEST:
        case FIND_PRODUCT_BY_CHAMPION_REQUEST:
        case FIND_PRODUCT_BY_REGION_REQUEST:
            return { ...state, loading: true, error: null }
        case FIND_PRODUCT_BY_SERIES_SUCCESS:
        case FIND_PRODUCT_BY_CHAMPION_SUCCESS:
        case FIND_PRODUCT_BY_REGION_SUCCESS:
            return { ...state, loading: false, error: null, productSeries: action.payload }
        case FIND_PRODUCT_BY_SERIES_FAILURE:
        case FIND_PRODUCT_BY_CHAMPION_FAILURE:
        case FIND_PRODUCT_BY_REGION_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}


export const carouselProductSeriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_CAROUSEL_PRODUCT_BY_SERIES_REQUEST:
            return { ...state, loading: true, error: null }
        case FIND_CAROUSEL_PRODUCT_BY_SERIES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                productCarousel: {
                    ...state.productCarousel,
                    [action.payload.sectionName]: action.payload.data
                }
            }
        case FIND_CAROUSEL_PRODUCT_BY_SERIES_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

export const getAllSeriesSkinReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SERIES_SKIN_REQUEST:
            return { ...state, loading: true, error: null }
        case GET_ALL_SERIES_SKIN_SUCCESS:  
            return { ...state, loading: false, error: null, series: action.payload }
        case GET_ALL_SERIES_SKIN_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

export const getNewProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_NEW_PRODUCT_REQUEST:
            return { ...state, loading: true, error: null }
        case FIND_NEW_PRODUCT_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                error: null, 
                newProducts: {
                    ...state.newProducts,
                    [action.payload.category]: action.payload.data
                } 
            }
        case FIND_NEW_PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}
