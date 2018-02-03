import SourceCoin from './main';
import {reducer as sourceReducer, moduleName, getSourceCoin} from './ducks';
import {sourceCoinsModuleSaga} from './saga';

export {SourceCoin, sourceReducer, moduleName, getSourceCoin, sourceCoinsModuleSaga};