import {createSelector} from 'reselect';
import {moduleName} from './ducks';

let state= (state) => state[moduleName];

const coins = createSelector(state, state => state.get('coins'));
const isFetching = createSelector(state, state => state.get('isFetching'));
const isLoad = createSelector(state, state => state.get('isLoad'));
const selectCoin = createSelector(state, state => state.get('selectCoin'));

export const selectSelectCoin = createSelector(
  selectCoin,
  (selectCoin) => selectCoin
);

export const selectCoins = createSelector(
  coins,
  (coins) => coins
);
export const selectIsFetching = createSelector(
  isFetching,
  (isFetching) => isFetching
);
export const selectIsLoad = createSelector(
  isLoad,
  (isLoad) => isLoad
);