import types from '../actions/types/listTypes'

const STATE = {
    list: []
}

export default (state = STATE, action) => {
    switch (action.type) {
        case types.SET_LIST:
            console.log(action.payload)
            return {
                list: action.payload,
                isLoading: false,
                nextUrl: action.payload.next,
                previousUrl: action.payload.previous,
            }
        case types.IS_LOADING:
            return { ...state, isLoading: true }
        default:
            return state
    }
}