import * as React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import configureStore from './store';
import history from './history';
import App from './App';
import {ListCoins} from './modules/ListCoins'
//import NoMatch from './components/NoMatch'

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={ListCoins}/>
      {/*  <Route exact path=":coin" component={DataCoin}/>*/}
       {/* <Route component={NoMatch}/>*/}
       {/* <Route path="/dash" component={App}/>*/}
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default Root