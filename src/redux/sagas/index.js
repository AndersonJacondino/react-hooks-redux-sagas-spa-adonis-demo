import tweetService from '../../service/tweetService'
import types from '../core/actions/types/listTypes'
import { put, call, takeLatest, all } from 'redux-saga/effects'

function* loadListSaga(page) {
    let jsonResponse = yield call(tweetService.getTweet, { apiEndpoint: '/tweets', page: page.payload })
    yield put({ type: types.SET_LIST, payload: jsonResponse.data })
}

function* setListSaga(obj) {
    let jsonResponse = yield call(tweetService.setTweet, { apiEndpoint: '/tweets', payload: obj.payload })
    yield put({ type: types.ATT_LIST, payload: jsonResponse.data })
}

export default function* rootSaga() {
    yield all([
        takeLatest(types.LOAD_LIST, loadListSaga),
        takeLatest(types.NEW_SET_LIST, setListSaga),
    ])
}