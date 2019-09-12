import tweetService from '../../service/tweetService'
import types from '../core/actions/types/listTypes'
import { put, call, takeLatest, all } from 'redux-saga/effects'

function* loadListSaga(action) {
    let jsonResponse = yield call(tweetService.getTweet, '/tweets')
    yield put({ type: types.SET_LIST, payload: jsonResponse.data })
}

export default function* rootSaga() {
    yield all([
        takeLatest(types.LOAD_LIST, loadListSaga)
    ])
}