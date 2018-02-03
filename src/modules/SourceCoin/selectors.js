import {createSelector} from 'reselect';
import {moduleName} from './ducks';
import {selectSelectCoin} from '../ListCoins';


let state= (state) => state[moduleName];

const dataCoin = createSelector(state, state => state.get('dataCoin'));

