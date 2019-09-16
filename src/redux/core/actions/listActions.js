import types from './types/listTypes'

export const loadlist = (payload) => ({
    type: types.LOAD_LIST,
    payload: payload,
})

export const setloadlist = (payload) => ({
    type: types.NEW_SET_LIST,
    payload: payload,
})