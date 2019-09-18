import types from '../actions/types/listTypes'

const STATE = {
    list: []
}

export default (state = STATE, action) => {
    switch (action.type) {
        case types.SET_LIST:
            return {
                ...state,
                list: [...state.list, action.payload.data],
                total: action.payload.total,
                lastPage: action.payload.lastPage,
                page: action.payload.page,
                perPage: action.payload.perPage,
            }
        case types.ATT_LIST:
            return {
                ...state,
                list: [...state.list, action.payload],
            }
        case types.IS_LOADING:
            return { ...state, isLoading: true }
        default:
            return state
    }
}