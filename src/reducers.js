import {combineReducers} from 'redux';
import {routerReducer as router, RouterState} from 'react-router-redux';
import {coinsReducer, moduleName as coins} from './modules/ListCoins';
import {sourceReducer, moduleName as source} from './modules/SourceCoin';

export default combineReducers({
  routing: router,
  [coins]: coinsReducer,
  [source]: sourceReducer
})