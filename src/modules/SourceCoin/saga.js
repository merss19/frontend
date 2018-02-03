import {take, fork, put, all, call} from 'redux-saga/effects';
import {apiData} from '../../tools/api';
import {callApi} from '../../tools/api';
import * as ducks from './ducks';
import * as api from './api';

const data = [
  {
    call: apiData.github,
    name: 'github',
    flds: ['commits_count', 'additions_count']
  },
  {
    call: apiData.twitter,
    name: 'twitter',
    flds: ['tweets_count', 'followers_count']
  },
  {
    call: apiData.telegram,
    name: 'telegram',
    flds: ['users_count', 'all_messages_count', 'new_messages_count']
  },
  {
    call: apiData.reddit,
    name: 'reddit',
    flds: ['comments_count', 'subscribers_count']
  },
  {
    call: apiData.googleSearch,
    name: 'googleSearch',
    flds: ['all_news_count', 'all_results_count']
  },
  {
    call: apiData.cryptoid,
    name: 'cryptoid',
    flds: ['active_nodes_count', 'transactions_count']
  },
  {
    call: apiData.bitcoinTalk,
    name: 'bitcoinTalk',
    flds: ['messages_count']
  }
]

export function* getSourceCoin(token, id) {
  for (let i in data)  {
    yield put(ducks.request(id, data[i].name));
    let {results, count} = yield call(callApi, api.fetchSource(token, id, data[i].call));
    if (count) {
      yield put(ducks.success(results, id, data[i].name, data[i].flds));
    } else {
      yield put(ducks.failure('нет данных', id, data[i].name));
    }
  }
}
export function* watchGetSourceCoin() {
  while (true) {
    const {data} = yield take(ducks.GET_SOURCE_COIN);
    const {token} =  yield call(callApi, api.fetchAuth());
    yield fork(getSourceCoin, token, data);
  }
}

export function* sourceCoinsModuleSaga() {
  yield all([
    fork(watchGetSourceCoin)
  ])
}