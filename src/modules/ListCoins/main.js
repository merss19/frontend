import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getListCoins, selectCoin, getViewCoin} from './ducks'
import * as selectors from './selectors';
import './style.css';
import {
  Route,
  Link
} from 'react-router-dom'
import {SourceCoin, getSourceCoin} from '../../modules/SourceCoin'

class ListCoins extends Component {

  componentWillMount(){
    const {getListCoins} = this.props
    getListCoins()
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.coins !== this.props.coins){
      const name = this.props.history.location.pathname.slice(1)
      nextProps.coins.forEach(item => {
        if (item.get('name') === name){
          this.props.getSourceCoin(item.get('id'))
          this.props.selectCoin(item.get('id'));
        }
      })
    }
  }


  selectCoin(coinId){
    const {selectCoin, getSourceCoin} = this.props
    selectCoin(coinId);
    getSourceCoin(coinId)
  }

  render() {
    const {coins,  isFetching, isLoad} = this.props;
    return (
      <div className="list-coins">
        <div className="list-coins__block">
          {
            coins.map(item => {
              return (
                <div
                  className="list-coins__item"
                  key={item.get('id')}
                >
                  <Link
                    to={"/" +item.get('name')}
                    className="list-coins__link"
                    onClick={() => this.selectCoin(item.get('id'))}
                  >{item.get('name')}
                  </Link>
                </div>)
            })
          }
        </div>
          <Route path="/:coin" component={SourceCoin}/>
      </div>
    );
  }
}



const mapStateToProps = (state) => ({
  coins: selectors.selectCoins(state),
  isFetching: selectors.selectIsFetching(state),
  isLoad: selectors.selectIsLoad(state)
});
export default connect(mapStateToProps, {getListCoins, selectCoin, getSourceCoin})(ListCoins);
