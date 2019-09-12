import types from './types/listTypes'

export const loadlist = () => ({
    type: types.LOAD_LIST
})

export const setIsLoading = () => ({
    type: types.IS_LOADING
})