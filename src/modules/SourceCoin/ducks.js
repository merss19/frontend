import * as Immutable from 'immutable';
import {combineReducers} from 'redux-immutable';
import {makeActionCreator} from '../../tools/utils';

export const moduleName = 'sourceCoin';

// Constant
export const GET_SOURCE_COIN_REQUEST = `${moduleName}/GET_SOURCE_COIN_REQUEST`;
export const GET_SOURCE_COIN_SUCCESS = `${moduleName}/GET_SOURCE_COIN_SUCCESS`;
export const GET_SOURCE_COIN_FAILURE = `${moduleName}/GET_SOURCE_COIN_FAILURE`;
export const GET_SOURCE_COIN = `${moduleName}/GET_SOURCE_COIN`;

// Action Creators
export const getSourceCoin = makeActionCreator(GET_SOURCE_COIN, 'data');

export const request = makeActionCreator(GET_SOURCE_COIN_REQUEST, 'coinId', 'field');
export const success = makeActionCreator(GET_SOURCE_COIN_SUCCESS, 'data', 'coinId', 'field', 'flds');
export const failure = makeActionCreator(GET_SOURCE_COIN_FAILURE, 'data', 'coinId', 'field');

// Reducer
const initialState = {
  dataCoin: {}
};
export const initialStateImmutable = Immutable.fromJS(initialState);

function coins(state = Immutable.fromJS({
  isFetching: false,
  isError: false,
  isLoad: false,
  name: '',
  errMsg: '',
  data: []
}), action) {
  switch (action.type) {
    case GET_SOURCE_COIN_REQUEST:
      return state.merge({
        isFetching: true,
      });

    case GET_SOURCE_COIN_SUCCESS:
      return state.merge({
        isFetching: false,
        data: action.data,
        name: action.field,
        flds: action.flds,
        isLoad: true,
      });

    case GET_SOURCE_COIN_FAILURE:
      return state.merge({
        isFetching: false,
        isError: true,
        errMsg: action.data
      });
    default:
      return state
  }
}

export const reducer = (state = initialStateImmutable, action) => {
  switch (action.type) {
    case GET_SOURCE_COIN_REQUEST:
    case GET_SOURCE_COIN_SUCCESS:
    case GET_SOURCE_COIN_FAILURE:
      return state.mergeIn(['dataCoin', action.coinId], {
        [action.field]:coins(state[action.field], action)
      });

    default:
      return state;
  }
};
