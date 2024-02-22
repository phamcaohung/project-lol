import { api } from "../../config/apiConfig"
import { CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCT_FAILURE, FIND_PRODUCT_REQUEST, FIND_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, FIND_PRODUCT_BY_SERIES_REQUEST, FIND_PRODUCT_BY_SERIES_SUCCESS, FIND_PRODUCT_BY_SERIES_FAILURE, FIND_CAROUSEL_PRODUCT_BY_SERIES_REQUEST, FIND_CAROUSEL_PRODUCT_BY_SERIES_SUCCESS, FIND_CAROUSEL_PRODUCT_BY_SERIES_FAILURE, GET_ALL_SERIES_REQUEST, GET_ALL_SERIES_SUCCESS, GET_ALL_SERIES_FAILURE, CAROUSEL_SKIN_PROJECT_REQUEST, CAROUSEL_SKIN_PROJECT_SUCCESS, CAROUSEL_SKIN_PROJECT_FAILURE, CAROUSEL_SKIN_COVEN_REQUEST, CAROUSEL_SKIN_COVEN_SUCCESS, CAROUSEL_SKIN_COVEN_FAILURE, CAROUSEL_SKIN_IMMORTAL_REQUEST, CAROUSEL_SKIN_IMMORTAL_SUCCESS, CAROUSEL_SKIN_IMMORTAL_FAILURE } from "./ActionType"

export const findProducts = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_REQUEST })

    const {
        tier,
        minPrice,
        maxPrice,
        minDiscount,
        category,
        stock,
        sort,
        name,
        series,
        pageNumber,
        pageSize } = reqData
    try {
        const { data } = await api.get(`/api/products?tier=${tier}&minPrice=${minPrice}&maxPrice=${maxPrice}
        &minDiscount=${minDiscount}&category=${category}&name=${name}&series=${series}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`)

        dispatch({ type: FIND_PRODUCT_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_FAILURE, payload: error.message })
    }
}

export const findProductsById = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST })
    const { productId } = reqData

    try {
        const { data } = await api.get(`/api/products/id/${productId}`)

        dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message })
    }
}


export const createProduct = (product) => async (dispatch) => {
    dispatch({ type: CREATE_PRODUCT_REQUEST })

    try {
        const { data } = await api.post(`/api/admin/products/`, product)

        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_PRODUCT_FAILURE,
            payload: error.message
        })
    }
}

export const deleteProduct = (productId) => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST })

    try {
        await api.delete(`/api/admin/products/${productId}/delete`)

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: productId
        })
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAILURE,
            payload: error.message
        })
    }
}

export const updateProduct = (productId, req) => async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_REQUEST })

    try {
        const { data } = await api.put(`/api/admin/products/${productId}/update`, req)

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAILURE,
            payload: error.message
        })
    }
}

export const findProductsBySeries = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_SERIES_REQUEST })
    const { id, series } = reqData

    try {
        const { data } = await api.get(`/api/products/series?series=${series}&id=${id}`)

        dispatch({ type: FIND_PRODUCT_BY_SERIES_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_SERIES_FAILURE, payload: error.message })
    }
}

export const findCarouselProductsBySeries = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_CAROUSEL_PRODUCT_BY_SERIES_REQUEST })

    try {
        const { data } = await api.get(`/api/products/carousel?series=${reqData}`)

        dispatch({ type: FIND_CAROUSEL_PRODUCT_BY_SERIES_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: FIND_CAROUSEL_PRODUCT_BY_SERIES_FAILURE, payload: error.message })
    }
}

export const findCarouselSkinProject = (reqData) => async (dispatch) => {
    dispatch({ type: CAROUSEL_SKIN_PROJECT_REQUEST })

    try {
        const { data } = await api.get(`/api/products/carousel?series=${reqData}`)

        dispatch({ type: CAROUSEL_SKIN_PROJECT_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CAROUSEL_SKIN_PROJECT_FAILURE, payload: error.message })
    }
}


export const findCarouselSkinCoven = (reqData) => async (dispatch) => {
    dispatch({ type: CAROUSEL_SKIN_COVEN_REQUEST })

    try {
        const { data } = await api.get(`/api/products/carousel?series=${reqData}`)

        dispatch({ type: CAROUSEL_SKIN_COVEN_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CAROUSEL_SKIN_COVEN_FAILURE, payload: error.message })
    }
}

export const findCarouselSkinImmortal = (reqData) => async (dispatch) => {
    dispatch({ type: CAROUSEL_SKIN_IMMORTAL_REQUEST })

    try {
        const { data } = await api.get(`/api/products/carousel?series=${reqData}`)

        dispatch({ type: CAROUSEL_SKIN_IMMORTAL_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: CAROUSEL_SKIN_IMMORTAL_FAILURE, payload: error.message })
    }
}



export const getAllSeriesName = () => async (dispatch) => {
    dispatch({ type: GET_ALL_SERIES_REQUEST })

    try {
        const { data } = await api.get(`/api/products/series/all`)

        dispatch({ type: GET_ALL_SERIES_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: GET_ALL_SERIES_FAILURE, payload: error.message })
    }
}

