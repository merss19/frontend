import * as Immutable from 'immutable';
import {combineReducers} from 'redux-immutable';
import {makeActionCreator} from '../../tools/utils';

export const moduleName = 'coins';

// Constant
export const GET_COINS = `${moduleName}/GET_LIST_COINS`;
export const SELECT_COIN = `${moduleName}/SELECT_COIN`;

export const GET_COINS_REQUEST = `${moduleName}/GET_COINS_REQUEST`;
export const GET_COINS_SUCCESS = `${moduleName}/GET_COINS_SUCCESS`;
export const GET_COINS_FAILURE = `${moduleName}/GET_COINS_FAILURE`;

// Action Creators
export const getListCoins = makeActionCreator(GET_COINS);
export const selectCoin = makeActionCreator(SELECT_COIN, 'data');

export const request = makeActionCreator(GET_COINS_REQUEST);
export const success = makeActionCreator(GET_COINS_SUCCESS, 'data');
export const failure = makeActionCreator(GET_COINS_FAILURE, 'data');


// Reducer
const initialState = {
  isFetching: false,
  isLoad: false,
  isError: false,
  errMsg: '',
  flds: [],
  coins: [],
  selectCoin: ''
};
export const initialStateImmutable = Immutable.fromJS(initialState);


export const reducer = (state = initialStateImmutable, action) => {

  switch (action.type) {
    case GET_COINS_REQUEST:
      return state.merge({
        isFetching: true,
        isError: false,
        isLoad: false
      });

    case GET_COINS_SUCCESS:
        return state.merge({
          isFetching: false,
          isLoad: true,
          isError: false,
          coins: action.data
        });

    case GET_COINS_FAILURE:
        return state.merge({
          isFetching: false,
          isLoad: false,
          isError: true,
          errMsg: action.data
        });

    case SELECT_COIN:
      return state.merge({
        selectCoin: action.data
      });

    default:
      return state;
  }
};
