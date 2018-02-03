import {take, fork, put, all, call} from 'redux-saga/effects';
import {apiData} from '../../tools/api';
import {callApi} from '../../tools/api';
import * as ducks from './ducks';
import * as api from './api';

export function* getCoins(token) {
  let  {results, count} = yield call(callApi, api.fetchListCoins(token));
  if (count) {
    yield put(ducks.success(results));
  } else {
    yield put(ducks.failure('нет данных'));
  }
}

export function* watchListCoins() {
  while (true) {
    yield take(ducks.GET_COINS);
    const {token} =  yield call(callApi, api.fetchAuth());
    yield put(ducks.request());
    yield fork(getCoins, token);
  }
}
export function* listCoinsModuleSaga() {
  yield all([
    fork(watchListCoins)
  ])
}