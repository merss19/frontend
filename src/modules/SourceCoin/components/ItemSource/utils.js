import moment from 'moment';
export const getInfo= (source) => {
  let period;
  let month = source.get('data')
  let week = source.get('data').filter( item => {
    const periodWeek = moment().subtract(7, 'days')
    return moment(item.get('created')).isAfter(moment(periodWeek))
  });
  let day = source.get('data').filter( item => {
    const periodDay = moment().subtract(1, 'days')
    return moment(item.get('created')).isAfter(moment(periodDay))
  });
  period = {
    month: month,
    week: week,
    day: day
  };
  return period;
};


export const getDataPeriod = (period, field) => {
  let month = period.month.map(item => {
    return item.get(field)
  });
  let week = period.week.map(item => {
    return item.get(field)
  });
  let day = period.day.map(item => {
    return item.get(field)
  });
  const name = field.slice(field.indexOf('_'));

  const data = {
    month,
    week,
    day
  };
  return getNumRender(data, field);

};

export const getNumRender = (data, field) => {
  const month = data.month.size ? data.month.max() - data.month.min() : 0;
  const week = data.week.size ? data.week.max() - data.week.min() : 0;
  const day = data.day.size ? data.day.max() - data.day.min() : 0;
  let name = field.slice(0, field.indexOf('_count'));
  if(name.indexOf('_')){
    name = name.replace(/_/gi, ' ');
  }
  return {
    name,
    month,
    week,
    day
  }
};

export const getSource = (source) => {
  let period = getInfo(source);
  let data =  source.get('flds').map((item, i) => {
    return getDataPeriod(period, item)
  });
  return data;
};
