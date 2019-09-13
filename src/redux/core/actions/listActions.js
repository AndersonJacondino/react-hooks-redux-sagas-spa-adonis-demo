import types from './types/listTypes'

export const loadlist = () => ({
    type: types.LOAD_LIST
})

export const setloadlist = (payload) => ({
    type: types.NEW_SET_LIST,
    payload: payload,
})