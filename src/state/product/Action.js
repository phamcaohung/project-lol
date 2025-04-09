import { api } from "../../config/apiConfig"
import { CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCT_FAILURE, FIND_PRODUCT_REQUEST, FIND_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, FIND_PRODUCT_BY_SERIES_REQUEST, FIND_PRODUCT_BY_SERIES_SUCCESS, FIND_PRODUCT_BY_SERIES_FAILURE, FIND_CAROUSEL_PRODUCT_BY_SERIES_REQUEST, FIND_CAROUSEL_PRODUCT_BY_SERIES_SUCCESS, FIND_CAROUSEL_PRODUCT_BY_SERIES_FAILURE, GET_ALL_SERIES_REQUEST, GET_ALL_SERIES_SUCCESS, GET_ALL_SERIES_FAILURE, FIND_NEW_PRODUCT_REQUEST, FIND_NEW_PRODUCT_SUCCESS, FIND_NEW_PRODUCT_FAILURE, FIND_PRODUCT_BY_CHAMPION_REQUEST, FIND_PRODUCT_BY_CHAMPION_SUCCESS, FIND_PRODUCT_BY_CHAMPION_FAILURE, FIND_PRODUCT_BY_REGION_REQUEST, FIND_PRODUCT_BY_REGION_SUCCESS, FIND_PRODUCT_BY_REGION_FAILURE, GET_ALL_SERIES_SKIN_REQUEST, GET_ALL_SERIES_SKIN_SUCCESS, GET_ALL_SERIES_SKIN_FAILURE } from "./ActionType"

export const findProducts = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_REQUEST })

    try {
        const { data } = await api.post('/api/products/filter', reqData , {
            headers: {
                "Content-Type": "application/json",
            }
        })  
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


export const createProduct = (formData) => async (dispatch) => {
    dispatch({ type: CREATE_PRODUCT_REQUEST })

    try {
        const { data } = await api.post(`/api/admin/products/`, formData, {
            headers: {
                "Content-Type" : "multipart/form-data",
            }
        })  
            

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

export const updateProduct = (productId, formData) => async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_REQUEST })

    try {
        const { data } = await api.put(`/api/admin/products/${productId}/update`, formData, {
            headers: {
                "Content-Type" : "multipart/form-data",
            },
        })

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
        const { data } = await api.get(`/api/products/skin/series?series=${series}&id=${id}`)

        dispatch({ type: FIND_PRODUCT_BY_SERIES_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_SERIES_FAILURE, payload: error.message })
    }
}

export const findSkinProductsBySeries = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_SERIES_REQUEST })
    const { id, series } = reqData

    try {
        const { data } = await api.get(`/api/products/skin/series?series=${series}&id=${id}`)

        dispatch({ type: FIND_PRODUCT_BY_SERIES_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_SERIES_FAILURE, payload: error.message })
    }
}

export const findChampionProductsByRegion = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_REGION_REQUEST })
    const { id, region } = reqData

    try {
        const { data } = await api.get(`/api/products/champion/region?region=${region}&id=${id}`)

        dispatch({ type: FIND_PRODUCT_BY_REGION_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_REGION_FAILURE, payload: error.message })
    }
}

export const findChibiProductsByChampion = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_CHAMPION_REQUEST })
    const { id, champion } = reqData

    try {
        const { data } = await api.get(`/api/products/chibi/champion?champion=${champion}&id=${id}`)

        dispatch({ type: FIND_PRODUCT_BY_CHAMPION_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_CHAMPION_FAILURE, payload: error.message })
    }
}

export const findCarouselProductsBySeries = (sectionName) => async (dispatch) => {
    dispatch({ type: FIND_CAROUSEL_PRODUCT_BY_SERIES_REQUEST })

    try {
        const { data } = await api.get(`/api/products/carousel?series=${sectionName}`)

        dispatch({
            type: FIND_CAROUSEL_PRODUCT_BY_SERIES_SUCCESS,
            payload: {
                sectionName,
                data,
            }
        })
    } catch (error) {
        dispatch({ type: FIND_CAROUSEL_PRODUCT_BY_SERIES_FAILURE, payload: error.message })
    }
}


export const getAllSeriesSkin = (category) => async (dispatch) => {
    dispatch({ type: GET_ALL_SERIES_SKIN_REQUEST })

    try {
        const { data } = await api.get(`/api/products/series/all?category=${category}`)

        dispatch({ type: GET_ALL_SERIES_SKIN_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: GET_ALL_SERIES_SKIN_FAILURE, payload: error.message })
    }
}

export const findNewProducts = (category) => async (dispatch) => {
    dispatch({ type: FIND_NEW_PRODUCT_REQUEST })

    try {
        const { data } = await api.get(`/api/products/new?category=${category}`)

        dispatch({
            type: FIND_NEW_PRODUCT_SUCCESS,
            payload: {
                category,
                data
            }
        })
    } catch (error) {
        dispatch({ type: FIND_NEW_PRODUCT_FAILURE, payload: error.message })
    }
}


