import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment'
import * as Immutable from 'immutable';
import ItemSource from './components/ItemSource'
import {selectSelectCoin} from '../ListCoins';
import './style.css';

class SourceCoin extends Component {

  render() {
    const {selectCoin, selectCoinData} = this.props;
    const nameCoin = this.props.match.params.coin
    let sources = []
    if(selectCoinData){
      const keys = selectCoinData.keySeq().toArray()
       sources = keys.map(item => {
        return selectCoinData.get(item)
      })
    }
    return (
      <div className="view-coin">
        <h2 className="view-coin__title">{nameCoin}</h2>
        <div className="view-coin__table source-table">
          <div className="source-table__block">
            <div className="source-table__item source-table__item--head source-table__item--id t-center">ID</div>
            <div className="source-table__item source-table__item--head source-table__item--source t-center" >Source</div>
            <div className="source-table__item source-table__item--head t-center" >Day</div>
            <div className="source-table__item source-table__item--head t-center" >Week</div>
            <div className="source-table__item source-table__item--head t-center" >Month</div>
          </div>

          <div>
            {
              sources.map((item, index)=> {
                if(item && !item.get('isFetching') && item.get('isLoad')) {
                  return (
                    <ItemSource
                      key ={index}
                      id={index+1}
                      sourceName={item.get('name')}
                      source={item}
                    />)
                } else if(item && item.get('isFetching')){
                  return (<div key ={'load-'+index}>Загрузка</div>);
                }
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const selectCoin = selectSelectCoin(state);
  const selectCoinData = state.sourceCoin.getIn(['dataCoin', selectCoin])
  return {
    selectCoin,
    selectCoinData
  }
};
export default connect(mapStateToProps)(SourceCoin);
