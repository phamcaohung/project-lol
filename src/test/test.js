//Reducer.js
const initialState = {
    response: null,
    error: null,
    loading: false,
}

export const createUserAddressReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER_ADDRESS_REQUEST:
        case EDIT_USER_ADDRESS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case CREATE_USER_ADDRESS_SUCCESS:
        case EDIT_USER_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: true,
                response: action.payload,
                error: null
            }
        case CREATE_USER_ADDRESS_FAILURE:
        case EDIT_USER_ADDRESS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

//store.js
const rootReducers = combineReducers({
    response: createUserAddressReducer
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))




