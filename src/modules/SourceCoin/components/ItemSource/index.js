import React, {Component} from 'react';
import {getSource} from './utils';
import './style.css';

export default class ItemSource extends Component {
  render() {
    const {source, sourceName, id} = this.props
    const isLoad = source && !source.get('isFetching') && source.get('isLoad')
    let data = isLoad ? getSource(source) : null;
    return (
      <div className="source-table__line">
        <div className="source-table__item source-table__item--id t-center-g">{id}</div>
        <div className="source-table__item source-table__item--source t-center-g">{sourceName}</div>
        <div className="source-table__item">
          {data && data.map((item, index) => {
            return (
              <div key={index} className="block-item">
                <div className="block-item__value ">{item.name}</div>
                <div className="block-item__value block-item__value--num">{item.day}</div>
              </div>
            )
          })}
        </div>
        <div className="source-table__item">
          {data && data.map((item, index) => {
            return (
              <div key={index} className="block-item">
                <div className="block-item__value">{item.name}</div>
                <div className="block-item__value block-item__value--num">{item.week}</div>
              </div>
            )
          })}
        </div>
        <div className="source-table__item">
          {data && data.map((item, index) => {
            return (
              <div key={index} className="block-item">
                <div className="block-item__value">{item.name}</div>
                <div className="block-item__value block-item__value--num">{item.month}</div>
              </div>
            )
          })}
        </div>
      </div>
    )


  }
}